import { modalClose } from '../groupLists/GroupModal.js';
import { GroupList } from '../groupLists/newGroupTable.js';

const addItem = document.querySelector('.wl-add-item');
const formModal = document.querySelector('.modal');
const innerFormModal = formModal.firstElementChild;
const formSubmit = document.querySelector('.as-form');
const groupListEl = document.querySelector('.group-list');
// console.log([...formSubmit.children]);

function getKeyValuesPairs(form) {
  const inputsArray = [...form.children];
  const emptyObject = {};
  inputsArray
    .filter(
      input => input.type === 'text' || input.type === 'tel'
      // return input;
    )
    .map(input => {
      const key = input.name;
      return (emptyObject[key] = `${input.value}`);
    });
  console.log(emptyObject);
  return emptyObject;
}

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

async function fetchData() {
  const urlGroups = 'http://localhost:3000/waiting_list';
  const response = await fetch(urlGroups);

  const data = await response.json();
  console.log(data);
}
fetchData();

formSubmit.addEventListener('submit', formSubmitData);

function openForm() {
  formModal.classList.add('modal-open');
  modalClose(formModal, innerFormModal);
}

addItem.addEventListener('click', openForm);
