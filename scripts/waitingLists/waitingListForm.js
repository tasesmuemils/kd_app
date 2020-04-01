import { modalClose, getKeyValuesPairs } from '../utils/utils.js';

// Creates and opens modal for group list item
export function waitingListForm(modal) {
  modal.classList.add('modal-open');
  const innerModal = modal.firstElementChild;
  innerModal.innerHTML = `
  <form class='as-form'>
    <h4>ADD STUDENT TO WAITING LIST</h4>
    <div class="as-form-student">
        <input type='text' name='first_name' placeholder='Name' data-validation='string'>
        <input type='text' name='last_name' placeholder='Last Name' data-validation='string'>
        <input type='text' name='birth_date' placeholder='Birthday' data-validation='date'>
        <input type='text' name='start_kg_date' placeholder='Date, when want to start' data-validation='date'>
    </div>
    
    <div class='as-form-parents'>
        <input type='text' name='mothers_name' placeholder='Mothers Name' data-validation='string'>
        <input type='tel' name='mothers_phone' placeholder='Mothers Phone Number' pattern='[0-9]' data-validation='phone'>
        <input type='text' name='fathers_name' placeholder='Fathers Name' data-validation='string''>
        <input type='tel' name='fathers_phone' placeholder='Fathers Phone Number' pattern='[0-9]' data-validation='phone'>
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
    function formValidation() {
      const formInputs = formSubmit.querySelectorAll('input');
      formInputs.forEach(input => {
        if (input.dataset.validation === 'string') {
          console.log(input);
        }
      });
    }
    formValidation();
    // const url = 'http://localhost:3000/wl';
    // fetch(url, {
    //   method: 'POST',
    //   body: JSON.stringify(getKeyValuesPairs(formSubmit)),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    modal.classList.remove('modal-open');
  }

  formSubmit.addEventListener('submit', formSubmitData);
}
