import { WaitingList } from './newWaitingListTable.js';
import { waitingListForm } from './waitingListForm.js';

const addItem = document.querySelector('.wl-add-item');
const formModal = document.querySelector('.modal');
const wlwrapper = document.querySelector('.group-list');
const urlWl = 'http://localhost:3000/wl';

// Getting waiting lists data from server
export async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  const newList = new WaitingList(data, wlwrapper);
  return newList;
}
fetchData(urlWl);

addItem.addEventListener('click', () => waitingListForm(formModal));
