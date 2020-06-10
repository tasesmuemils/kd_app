// Imports date picker
import flatpickr from 'flatpickr';
// Utils
import {
  genderTranform,
  modalClose,
  getKeyValuesPairs,
} from '../utils/utils.js';
// Templates
import { wlStudentTmpl, addToWlForm } from '../utils/templates.js';

// Style for date picker
require('flatpickr/dist/themes/dark.css');

const addStudentBtn = document.querySelector('.add-student-btn');
const formModal = document.querySelector('.modal');
const wlwrapper = document.querySelector('.group-list');
const urlWl = 'http://localhost:3000/wl';

// Getting waiting lists data from server
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  const newList = new WaitingList(data, wlwrapper);
  console.log(data);
  return newList;
}
fetchData(urlWl);

// Create GroupList Object
function WaitingList(wlData, tableWrapper) {
  this.wlData = wlData;
  this.tableWrapper = tableWrapper;
  this.newTable(this.wlData);
}

WaitingList.prototype.newTable = function(wlData) {
  // Creates Table
  const wlTable = document.createElement('div');
  wlTable.classList.add('table-style');

  // For each student create table row
  wlData.forEach((student, i) => {
    const studentRow = document.createElement('div');
    studentRow.classList.add('table-row');
    studentRow.addEventListener('click', () =>
      wlModal(document.querySelector('.modal'), student)
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
    wlTable.insertAdjacentElement('beforeend', studentRow);
  });
  this.tableWrapper.insertAdjacentElement('afterbegin', wlTable);
};

// Creates and opens modal for group list item
function wlModal(modal, modalData) {
  modal.classList.add('modal-open');
  const innerModal = modal.firstElementChild;
  innerModal.innerHTML = wlStudentTmpl(modalData);
  modalClose(modal, innerModal);

  const editBtn = document.querySelector('.editItem');
  const deleteBtn = document.querySelector('.deleteItem');
  const moveBtn = document.querySelector('.moveBtn');
  const saveBtn = document.querySelector('.saveItem');
  const capturedInputs = document.querySelectorAll('.wl-modal input');

  const url = 'http://localhost:3000/wl/';

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

    fetch(`http://localhost:3000/wl/${modalData.id}`, {
      method: 'PATCH',
      body: JSON.stringify(getKeyValuesPairs(capturedInputsArray)),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(() => {
        document.querySelector('.group-list').innerHTML = '';
        fetchData(url);
      });
  });

  // Event to delete waiting list item
  deleteBtn.addEventListener('click', () => {
    fetch(`${url}${modalData.id}`, {
      method: 'DELETE',
    });
    modal.classList.remove('modal-open');
    document.querySelector('.group-list').innerHTML = '';
    fetchData(url);
  });

  // Event to move waiting list item to group list
  moveBtn.addEventListener('click', () => {
    const mtgModal = document.querySelector('.mtg-modal');
    const mtgInnerModal = mtgModal.firstElementChild;
    mtgModal.classList.add('modal-open');
    fetch('http://localhost:3000/groups')
      .then(resp => resp.json())
      .then(groups => {
        groups.forEach(group => {
          const mtgWrapper = document.createElement('div');
          mtgWrapper.innerHTML = `
            <figure>${group.group_icon}</figure>
            <h5>${group.group_name}</h5>
          `;
          mtgWrapper.addEventListener('click', () => {
            fetch(`${url}${modalData.id}`)
              .then(resp => resp.json())
              .then(newStudent => {
                newStudent.groupId = group.id;
                fetch('http://localhost:3000/students', {
                  method: 'POST',
                  body: JSON.stringify(newStudent),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
                fetch(`${url}${modalData.id}`, {
                  method: 'DELETE',
                })
                  .then(res => res.json())
                  .then(() => {
                    modal.classList.remove('modal-open');
                    mtgModal.classList.remove('modal-open');
                    document.querySelector('.table-style').remove();
                  });
                fetch('http://localhost:3000/wl')
                  .then(resp => resp.json())
                  .then(() => {
                    document.querySelector('.group-list').innerHTML = '';
                    fetchData(url);
                  });
              });
          });
          mtgInnerModal.insertAdjacentElement('beforeend', mtgWrapper);
        });
      });
    modalClose(mtgModal, mtgInnerModal);
  });
}

// Creates and opens form modal to add student to waitng list
function waitingListForm(modal) {
  modal.classList.add('modal-open');
  const innerModal = modal.firstElementChild;
  innerModal.innerHTML = addToWlForm();
  // Adds close button to modal
  modalClose(modal, innerModal);

  // Selecting form and form tabs, also index for first tab
  const formSubmit = document.querySelector('.as-form');
  const formInputsArray = [...formSubmit.querySelectorAll('.as-form-input')];
  console.log(formInputsArray);
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
    const url = 'http://localhost:3000/wl';
    const convertedObject = getKeyValuesPairs(formInputsArray);
    // Random ID
    convertedObject.id = Math.floor(Math.random() * 300);

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(convertedObject),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(() => {
        modal.classList.remove('modal-open');
        document.querySelector('.table-style').remove();
        fetch('http://localhost:3000/wl')
          .then(resp => resp.json())
          .then(wlData => {
            new WaitingList(wlData, document.querySelector('.group-list'));
          });
      });
  }

  formSubmit.addEventListener('submit', formSubmitData);
}

// Button opens "add student to waiting list" form
addStudentBtn.addEventListener('click', () => waitingListForm(formModal));
