import { getKeyValuesPairs, modalClose } from '../utils/utils.js';

const addItem = document.querySelector('.wl-add-item');
const formModal = document.querySelector('.modal');
const innerFormModal = formModal.firstElementChild;
const formSubmit = document.querySelector('.as-form');

// Submits waiting lists form data to server
function formSubmitData(e) {
  e.preventDefault();

  fetch('http://localhost:3000/waiting_list', {
    method: 'post',
    body: JSON.stringify(getKeyValuesPairs(formSubmit)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  formModal.classList.remove('modal-open');
}

// Getting waiting lists data from server
async function fetchData() {
  const urlGroups = 'http://localhost:3000/waiting_list';
  const response = await fetch(urlGroups);

  const data = await response.json();
  console.log(data);
}
fetchData();

function openForm() {
  formModal.classList.add('modal-open');
  modalClose(formModal, innerFormModal);
}

formSubmit.addEventListener('submit', formSubmitData);
addItem.addEventListener('click', openForm);
