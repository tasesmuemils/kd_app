// Imports date picker
import flatpickr from 'flatpickr';
// Utils
import {
  genderTranform,
  modalClose,
  getKeyValuesPairs,
  formPages,
} from '../utils/utils.js';
// Templates
import {
  wlStudentTmpl,
  addToWlForm,
  studentRowTemplate,
} from '../utils/templates.js';

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
    const studentRowContent = studentRowTemplate(student, i, genderTranform);

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
  const capturedInputs = document.querySelectorAll(
    '.wl-modal input, .wl-modal textarea, .wl-modal select'
  );

  // Showing right gender option from database
  document.querySelectorAll('.wl-modal select option').forEach(option => {
    if (option.value === modalData.gender) {
      option.selected = true;
    }
  });

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
    console.log(capturedInputs);
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

  // Delete item from list
  deleteBtn.addEventListener('click', () => {
    fetch(`${url}${modalData.id}`, {
      method: 'DELETE',
    });
    modal.classList.remove('modal-open');
    document.querySelector('.group-list').innerHTML = '';
    fetchData(url);
  });

  // Event to move waiting list item to group list
  let clickedMoveModal = 0;

  moveBtn.addEventListener('click', () => {
    const mtgModal = document.querySelector('.mtg-modal');
    const mtgInnerModal = mtgModal.firstElementChild;
    modalClose(mtgModal, mtgInnerModal);
    mtgModal.classList.add('modal-open');
    if (clickedMoveModal === 1) {
      return;
    }
    clickedMoveModal = 1;
    fetch('http://localhost:3000/groups')
      .then(resp => resp.json())
      .then(groups => {
        groups.forEach(group => {
          const mtgWrapper = document.createElement('div');
          mtgWrapper.classList.add('mtgWrapper');
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
  const formTab = document.querySelectorAll('.tab');

  // Date format with flatpickr
  flatpickr('.flatpickr', {
    dateFormat: 'd.m.Y',
  });

  // FORM PAGES
  formPages(formTab, formSubmit);

  function formSubmitData(e) {
    e.preventDefault();

    // VALIDATION MUST BE HERE
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
