// IMPORTS
import flatpickr from 'flatpickr';
import { getKeyValuesPairs, modalClose } from '../utils/utils.js';
import { addPersonFormTmpl, searchPersonFormTmpl } from '../utils/home_tmpl.js';

// Flatpickr calendar
require('flatpickr/dist/themes/dark.css');

// Main Variables
const homeModal = document.querySelector('.modal');
const addPersonPanel = document.querySelector('.hd-add-person');
const findPersonPanel = document.querySelector('.hd-find-person');

// ADD PERSON TO DB
function addPerson(modal) {
  // Opens add person form modal
  modal.classList.add('modal-open');
  const innerModal = modal.firstElementChild;
  innerModal.innerHTML = addPersonFormTmpl();

  // Date format with flatpickr
  flatpickr('.flatpickr', {
    dateFormat: 'Y-m-d',
  });

  // Close modal
  modalClose(modal, innerModal);

  // Form variables
  const personForm = document.querySelector('.create-person-form');
  const formInputsArray = [...personForm.querySelectorAll('.as-form-input')];

  // On form submit, addd person to data base
  personForm.addEventListener('submit', e => {
    e.preventDefault();

    // Captured inputs
    const convertedObject = getKeyValuesPairs(formInputsArray);
    fetch('https://dzelzs.lv/kindergarten/v1/person/create', {
      method: 'POST',
      body: JSON.stringify({ input: { person: convertedObject } }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        modal.classList.remove('modal-open');
        console.log(data);
      });
  });
}
// ADD PERSON TO DB END

// SEARCH PERSON IN DB
function findPerson(modal) {
  // Opens add person form modal
  modal.classList.add('modal-open');
  const innerModal = modal.firstElementChild;
  innerModal.innerHTML = searchPersonFormTmpl();

  // Close modal
  modalClose(modal, innerModal);

  const findPersonForm = document.querySelector('.find-person-form');

  findPersonForm.addEventListener('submit', e => {
    e.preventDefault();

    // Collects input values and coverts them in to objetc
    const formInputsArray = [...findPersonForm.querySelectorAll('.form-input')];
    const convertedObject = getKeyValuesPairs(formInputsArray);

    fetch('https://dzelzs.lv/kindergarten/v1/person/searchByCriteria', {
      method: 'POST',
      body: JSON.stringify({
        input: { personSearchCriteria: convertedObject },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(result => {
        // Captures table and clears it every time
        const searchResultTable = document.querySelector('.search-results');
        searchResultTable.innerHTML = '';
        const resultArray = result.data.persons;
        resultArray.forEach(item => {
          const rowEl = document.createElement('div');
          rowEl.innerHTML = `<p>${item.name} ${item.surname}</p>`;
          searchResultTable.insertAdjacentElement('afterbegin', rowEl);
        });
      });
  });
}
// SEARCH PERSON IN DB END

// EVENT LISTENERS LIST
addPersonPanel.addEventListener('click', () => addPerson(homeModal));
findPersonPanel.addEventListener('click', () => findPerson(homeModal));
