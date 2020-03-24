import { modalClose } from '../groupLists/GroupModal.js';

const addItem = document.querySelector('.wl-add-item');
const formModal = document.querySelector('.modal');

function openForm() {
  formModal.classList.add('modal-open');
  const innerFormModal = formModal.firstElementChild;
  innerFormModal.innerHTML = `
    <form class='as-form'>  
      <h4>ADD STUDENT TO WAITING LIST</h4>
      <div class='form-child-info'>
        <input type='text' name='first_name' placeholder='Name'>
        <input type='text' name='last_name' placeholder='Last Name'>
        <input type='text' name='birthday' placeholder='Birthday'>
      </div>
      <div class='form-parent-info'>
        <div class='fp-mother'>
          <input type='text' name='mother_name' placeholder='Mothers Name'>
          <input type='tel' name='mother_phone' placeholder='Mothers Phone Number' pattern='[0-9]'>
        </div>
        <div class='fp-father'>
          <input type='text' name='father_name' placeholder='Fathers Name'>
          <input type='tel' name='father_phone' placeholder='Fathers Phone Number' pattern='[0-9]'>
        </div>
      </div>
      <div class='form-notes'>
        <textarea placeholde='Notes' rows='4' cols='50'></textarea>
      </div>
      <div class='form-buttons'>
        <input type='submit' value='SUBMIT' name='form-submit'>
      </div>
    </form>
  `;
  modalClose(formModal, innerFormModal);
  // innerFormModal.insertAdjacentElement('beforeend', formEl);
}

addItem.addEventListener('click', openForm);
