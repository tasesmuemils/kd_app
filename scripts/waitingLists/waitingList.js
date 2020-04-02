import { getKeyValuesPairs, modalClose } from '../utils/utils.js';
import { WaitingList } from './newWaitingListTable.js';
import { waitingListForm } from './waitingListForm.js';

const addItem = document.querySelector('.wl-add-item');
const formModal = document.querySelector('.modal');
const innerFormModal = formModal.firstElementChild;
const formSubmit = document.querySelector('.as-form');
const wlwrapper = document.querySelector('.group-list');

// Submits waiting lists form data to server
function formSubmitData(e) {
  e.preventDefault();
  const url = 'http://localhost:3000/wl';
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(getKeyValuesPairs(formSubmit)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  formModal.classList.remove('modal-open');
}

// Getting waiting lists data from server
async function fetchData() {
  const urlGroups = 'http://localhost:3000/wl';
  const response = await fetch(urlGroups);

  const data = await response.json();
  const newList = new WaitingList(data, wlwrapper);
  return newList;
}
fetchData();

addItem.addEventListener('click', () => waitingListForm(formModal));
