import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import flatpickr from 'flatpickr';
import {
  genderTranform,
  modalClose,
  getKeyValuesPairs,
  formPages,
  transformDate,
  sortStudents,
} from '../utils/utils.js';
import {
  groupStudentTmpl,
  addToGroupForm,
  sliderCardContent,
  studentRowTemplate,
} from '../utils/templates.js';

// Style for date picker
require('flatpickr/dist/themes/dark.css');

// transformDate(09.06.1993);
console.log(formatDistanceToNowStrict(new Date(2016, 2, 13)));

// Required variables from html file
const slider = document.querySelector('.slider');
const groupListEl = document.querySelector('.group-list');
const urlGroups = 'http://localhost:3000/groups';
const addStudentBtn = document.querySelector('.add-student-btn');
const formModal = document.querySelector('.modal');

// When card is clicked, clicked = false
function sliderClickHandling(sliderWrapper) {
  sliderWrapper.childNodes.forEach(card => (card.dataset.clicked = 'false'));
  document.querySelector('.sortOptions').selectedIndex = 0;
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
        // FILTERS
        const sortTableRows = [
          ...document.querySelectorAll(
            `.table-style[data-group_name="${groupData.group_name}"] .table-row`
          ),
        ];
        const sortOptions = document.querySelector('.sortOptions');
        console.log(sortTableRows, sortOptions);

        sortOptions.addEventListener('change', () => {
          sortStudents(
            sortOptions,
            sortTableRows,
            document.querySelector(
              `.table-style[data-group_name="${groupData.group_name}"]`
            )
          );
        });
      }
    });
  });
  sliderInnerCard.innerHTML = sliderCardContent(groupData, students);
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
    const studentRowContent = studentRowTemplate(student, i, genderTranform);

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
  console.log(groupData, modalData);
  transformDate(modalData.birth_date);
  modal.classList.add('modal-open');
  const innerModal = modal.firstElementChild;
  innerModal.innerHTML = groupStudentTmpl(modalData);

  modalClose(modal, innerModal);

  const deleteBtn = document.querySelector('.deleteItem');
  const editBtn = document.querySelector('.editItem');
  const saveBtn = document.querySelector('.saveItem');

  const capturedInputs = document.querySelectorAll(
    '.group-modal input, .group-modal textarea, .group-modal select'
  );

  const url = `http://localhost:3000/students/${modalData.id}`;

  // Showing right gender option from database
  document.querySelectorAll('.group-modal select option').forEach(option => {
    if (option.value === modalData.gender) {
      option.selected = true;
    }
  });

  // Delete item from list
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
    console.log(capturedInputsArray);
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

  // FORM PAGES
  formPages(formTab, formSubmit);

  function formSubmitData(e) {
    e.preventDefault();

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
