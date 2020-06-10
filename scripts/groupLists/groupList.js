import flatpickr from 'flatpickr';
import {
  genderTranform,
  modalClose,
  getKeyValuesPairs,
} from '../utils/utils.js';
import { groupStudentTmpl, addToGroupForm } from '../utils/templates.js';

// Style for date picker
require('flatpickr/dist/themes/dark.css');

// Required variables from html file
const slider = document.querySelector('.slider');
const groupListEl = document.querySelector('.group-list');
const urlGroups = 'http://localhost:3000/groups';
const addStudentBtn = document.querySelector('.add-student-btn');
const formModal = document.querySelector('.modal');

// When card is clicked, clicked = false
function sliderClickHandling(sliderWrapper) {
  sliderWrapper.childNodes.forEach(card => (card.dataset.clicked = 'false'));
}

// Create a slider card deppending on how many groups there are
function sliderData(groupData, students) {
  const sliderInnerCard = document.createElement('div');
  sliderInnerCard.classList.add('sliderCard');
  sliderInnerCard.setAttribute('data-group_name', groupData.group_name);
  sliderInnerCard.setAttribute('data-clicked', false);
  sliderInnerCard.addEventListener('click', e => {
    // Before adding clicked = true, every slider clicked turns to false
    sliderClickHandling(slider);
    e.currentTarget.dataset.clicked = true;
    groupListEl.childNodes.forEach(table => {
      table.style.display = 'none';
      // If groups tables name attribute = group name from server, shows table
      if (table.dataset.group_name === groupData.group_name) {
        table.style.display = 'grid';
      }
    });
  });
  sliderInnerCard.innerHTML = `
    <figure>${groupData.group_icon}</figure>
    <h5 data-groupId='${groupData.id}'>${groupData.group_name}</h5>
    <p><span>${students.length}</span> /20</p>
  `;
  slider.insertAdjacentElement('beforeend', sliderInnerCard);
  new GroupList(groupData, students, groupListEl);
}

// Gets data from groups and groups students
export async function fetchGroupData(url) {
  const groupResponse = await fetch(url);
  const groupData = await groupResponse.json();

  groupData.forEach(group => {
    fetch(`${urlGroups}/${group.id}/students`)
      .then(resp => resp.json())
      .then(studentsData => sliderData(group, studentsData));
  });
}

fetchGroupData(urlGroups);

// Create GroupList Object
export function GroupList(groupData, studentsData, tableWrapper) {
  this.groupData = groupData;
  this.studentsData = studentsData;
  this.tableWrapper = tableWrapper;
  this.newTable(this.groupData, this.studentsData);
}

// Function for creating table, table rows
GroupList.prototype.newTable = function(groupData, studentsData) {
  // Creates Table
  const groupTable = document.createElement('div');
  groupTable.classList.add('table-style');
  groupTable.style.display = 'none';
  groupTable.setAttribute('data-group_name', `${groupData.group_name}`);

  // For each student create table row
  studentsData.forEach((student, i) => {
    const studentRow = document.createElement('div');
    studentRow.classList.add('table-row');
    studentRow.addEventListener('click', () =>
      groupModal(document.querySelector('.modal'), student, groupData)
    );
    const studentRowContent = `
            <div class="table-cell-wrapper">
                <div class="table-cell">${i + 1}</div>
                <div class="table-cell">${genderTranform(student.gender)} ${
      student.first_name
    } ${student.last_name}</div>
            </div>
            <div class="table-cell age-cell"><i class="age-icon far fa-calendar-alt"></i>${
              student.birth_date
            }</div>
        `;

    // Append row content to row and row to table
    studentRow.insertAdjacentHTML('beforeend', studentRowContent);
    groupTable.insertAdjacentElement('beforeend', studentRow);
  });
  this.tableWrapper.insertAdjacentElement('afterbegin', groupTable);
};

// Updates data after deleting student, adding student, edditing student data
function updateGroupsData(groupData, url) {
  const tableEl = document.querySelector(
    `.table-style[data-group_name="${groupData.group_name}"]`
  );
  tableEl.remove();
  fetch(url)
    .then(resp => resp.json())
    .then(studentsData => {
      new GroupList(groupData, studentsData, groupListEl);
      const groupName = document.querySelector(
        `.table-style[data-group_name="${groupData.group_name}"]`
      ).dataset.group_name;
      document.querySelector(
        `.table-style[data-group_name='${groupName}']`
      ).style.display = 'grid';

      document.querySelector(
        `.sliderCard[data-group_name="${groupName}"] span`
      ).textContent = studentsData.length;
    });
}

// Creates and opens modal for group list item
function groupModal(modal, modalData, groupData) {
  console.log(groupData);
  modal.classList.add('modal-open');
  const innerModal = modal.firstElementChild;
  innerModal.innerHTML = groupStudentTmpl(modalData);

  modalClose(modal, innerModal);

  const deleteBtn = document.querySelector('.deleteItem');
  const editBtn = document.querySelector('.editItem');
  const saveBtn = document.querySelector('.saveItem');

  const capturedInputs = document.querySelectorAll('.group-modal input');

  const url = `http://localhost:3000/students/${modalData.id}`;

  // Delete student
  deleteBtn.addEventListener('click', e => {
    e.preventDefault();
    fetch(url, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        modal.classList.remove('modal-open');

        updateGroupsData(
          groupData,
          `http://localhost:3000/students?groupId=${modalData.groupId}`
        );
      });
  });

  // Edit student data in modal
  editBtn.addEventListener('click', e => {
    e.preventDefault();
    editBtn.classList.add('hide');
    saveBtn.classList.remove('hide');
    capturedInputs.forEach(input => {
      input.disabled = false;
      input.classList.remove('.disabled-input');
      input.classList.add('enabled-input');
    });
    console.log(capturedInputs);
  });

  // Save edited students data
  saveBtn.addEventListener('click', e => {
    e.preventDefault();
    const capturedInputsArray = [...capturedInputs];
    editBtn.classList.remove('hide');
    saveBtn.classList.add('hide');
    capturedInputs.forEach(input => {
      input.disabled = true;
      input.classList.remove('enabled-input');
      input.classList.add('disabled-input');
    });

    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(getKeyValuesPairs(capturedInputsArray)),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(() => {
        updateGroupsData(
          groupData,
          `http://localhost:3000/students?groupId=${modalData.groupId}`
        );
      });
  });
}

// Creates and opens form modal to add student to group list
function groupForm(modal) {
  modal.classList.add('modal-open');
  const innerModal = modal.firstElementChild;
  innerModal.innerHTML = addToGroupForm();

  // Getting group names from sliderCard to add group ID to new student
  const groupNamesEl = [...document.querySelectorAll('.sliderCard h5')];
  console.log(groupNamesEl);
  groupNamesEl
    .map(
      el => `<option value="${el.dataset.groupid}">${el.textContent}</option>`
    )
    .forEach(el => {
      document
        .querySelector(`.as-form-input[name="groupId"]`)
        .insertAdjacentHTML('beforeend', el);
    });

  // Adds close button to modal
  modalClose(modal, innerModal);

  // Selecting form and form tabs, also index for first tab
  const formSubmit = document.querySelector('.as-form');
  const formInputsArray = [...formSubmit.querySelectorAll('.as-form-input')];
  console.log(getKeyValuesPairs(formInputsArray));
  const formTab = document.querySelectorAll('.tab');

  // Date format with flatpickr
  flatpickr('.flatpickr', {
    dateFormat: 'd.m.Y',
  });
  // Current tab index
  let currentTabIndex = 0;

  // Shows first tab of the form
  function showFormTab(n) {
    formTab[n].style.display = 'grid';
    document.querySelector('#prevBtn').style.display = 'none';
    document.querySelector('input[type="submit"]').style.display = 'none';
  }
  showFormTab(currentTabIndex);

  // Form validation
  function formValidation() {
    // Error messages element handling
    function insertErrorMessage(errElement, errText) {
      errElement.classList.add('input-err-msg');
      errElement.textContent = errText;
    }

    // Object with error messages
    const errorMessages = {
      empty: 'Field cant be empty',
    };

    // If input value is empty
    const formStudentInputs = formSubmit.querySelectorAll(
      '.as-form-student input'
    );
    console.log(formStudentInputs);
    let valid = true;
    formStudentInputs.forEach(input => {
      console.log();
      // Error messages element
      const errorMsgEl = input.parentElement.lastElementChild;
      if (input.value === '') {
        // If input value is empty
        insertErrorMessage(errorMsgEl, errorMessages.empty);
        valid = false;
      } else if (valid) {
        insertErrorMessage(errorMsgEl, '');
      }
    });
    return valid;
  }

  // Shows next form tab or switches to previous tab
  function nextFormTab(n) {
    if (!formValidation()) return false;
    formTab[currentTabIndex].style.display = 'none';
    currentTabIndex += n;
    formTab[currentTabIndex].style.display = 'grid';
    if (currentTabIndex !== 0) {
      document.querySelector('#nextBtn').style.display = 'none';
      document.querySelector('#prevBtn').style.display = 'inline';
      document.querySelector('input[type="submit"]').style.display = 'inline';
    } else {
      document.querySelector('#nextBtn').style.display = 'inline';
      document.querySelector('#prevBtn').style.display = 'none';
      document.querySelector('input[type="submit"]').style.display = 'none';
    }
  }

  // Form "next" and "previous" button
  document.querySelector('#nextBtn').addEventListener('click', () => {
    nextFormTab(1);
  });
  document.querySelector('#prevBtn').addEventListener('click', () => {
    nextFormTab(-1);
  });

  function formSubmitData(e) {
    e.preventDefault();

    formValidation();
    const convertedObject = getKeyValuesPairs(formInputsArray);
    // Random ID
    convertedObject.id = Math.floor(Math.random() * 300);

    fetch('http://localhost:3000/students', {
      method: 'POST',
      body: JSON.stringify(convertedObject),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(() => {
        fetch(`http://localhost:3000/groups/${convertedObject.groupId}`)
          .then(resp => resp.json())
          .then(groupData => {
            modal.classList.remove('modal-open');
            updateGroupsData(
              groupData,
              `http://localhost:3000/students?groupId=${groupData.id}`
            );
          });
      });
  }

  formSubmit.addEventListener('submit', formSubmitData);
}

// adds event to button, which opens group form
addStudentBtn.addEventListener('click', () => groupForm(formModal));
