import { modalClose, getKeyValuesPairs } from '../utils/utils.js';

// Creates and opens modal for group list item
export function waitingListForm(modal) {
  modal.classList.add('modal-open');
  const innerModal = modal.firstElementChild;
  innerModal.innerHTML = `
  <form class='as-form'>
    <h4>ADD STUDENT TO WAITING LIST</h4>
    <div class="as-form-student">
        <input type='text' name='first_name' placeholder='Name'>
        <input type='text' name='last_name' placeholder='Last Name'>
        <input type='text' name='birth_date' placeholder='Birthday'>
        <input type='text' name='start_kg_date' placeholder='Date, when want to start'>
    </div>
    
    <div class='as-form-parents'>
        <input type='text' name='mothers_name' placeholder='Mothers Name'>
        <input type='tel' name='mothers_phone' placeholder='Mothers Phone Number' pattern='[0-9]'>
        <input type='text' name='fathers_name' placeholder='Fathers Name'>
        <input type='tel' name='fathers_phone' placeholder='Fathers Phone Number' pattern='[0-9]'>
    </div>
    
    <div class='as-form-notes'>
        <input type="text" name='notes' placeholder="Notes">
    </div>

    <input type='submit' value='SUBMIT' name='form-submit'>
  </form>
  `;
  modalClose(modal, innerModal);
  const formSubmit = document.querySelector('.as-form');

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
    modal.classList.remove('modal-open');
  }

  formSubmit.addEventListener('submit', formSubmitData);
}
