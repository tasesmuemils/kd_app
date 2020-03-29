import { getKeyValuesPairs, modalClose } from '../utils/utils.js';
import { WaitingList } from './newWaitingListTable.js';

const addItem = document.querySelector('.wl-add-item');
const formModal = document.querySelector('.modal');
const innerFormModal = formModal.firstElementChild;
const formSubmit = document.querySelector('.as-form');
console.log(formSubmit);
const wlwrapper = document.querySelector('.group-list');

// Submits waiting lists form data to server
function formSubmitData(e) {
  e.preventDefault();
  console.log('NOT REFRESH');
  fetch('http://localhost:3000/waiting_list', {
    method: 'POST',
    body: JSON.stringify(getKeyValuesPairs(formSubmit)),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => console.log(data));
  formModal.classList.remove('modal-open');
  // fetchData();
}

// Getting waiting lists data from server
async function fetchData() {
  const urlGroups = 'http://localhost:3000/waiting_list';
  const response = await fetch(urlGroups);

  const data = await response.json();
  console.log(data);
  new WaitingList(data, wlwrapper);
}
fetchData();

function openForm() {
  formModal.classList.add('modal-open');
  modalClose(formModal, innerFormModal);
}

formSubmit.addEventListener('submit', formSubmitData);
addItem.addEventListener('click', openForm);
