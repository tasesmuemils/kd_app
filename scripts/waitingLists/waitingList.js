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
  // formModal.classList.remove('modal-open');
}

// body: JSON.stringify(getKeyValuesPairs(formSubmit)),
// headers: {
//   // 'Content-Type': 'application/json',
// },

// // Getting waiting lists data from server
// async function fetchData() {
//   const urlGroups = 'http://localhost:3000/waiting_list';
//   const response = await fetch(urlGroups);

//   const data = await response.json();
//   console.log(data);
//   new WaitingList(data, wlwrapper);
// }
// // fetchData();

function openForm() {
  formModal.classList.add('modal-open');
  modalClose(formModal, innerFormModal);
}

// formSubmit.addEventListener('click', );
addItem.addEventListener('click', e => {
  e.preventDefault();
  console.log();
  const url = 'http://localhost:3000/waiting_list';
  const options = { method: 'POST' };
  fetch(url, options);
  console.log('Still not reloading');
  formModal.classList.remove('modal-open');
});
