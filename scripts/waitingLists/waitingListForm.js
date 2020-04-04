import { modalClose, getKeyValuesPairs } from '../utils/utils.js';

// Creates and opens modal for group list item
export function waitingListForm(modal) {
  modal.classList.add('modal-open');
  const innerModal = modal.firstElementChild;
  innerModal.innerHTML = `
  <form class='as-form'>
    <h4>ADD STUDENT TO WAITING LIST</h4>
    <div class="as-form-student tab">
      <div class='input-control'>
        <input type='text' name='first_name' placeholder='Name' data-validation='string'>
        <p>Err</p>
      </div>
      <div class='input-control'>
        <input type='text' name='last_name' placeholder='Last Name' data-validation='string'>
      </div>
      <div class='input-control'>
        <input type='text' name='birth_date' placeholder='Birthday' data-validation='date'>
      </div>
      <div class='input-control'>
        <input type='text' name='start_kg_date' placeholder='Date, when want to start' data-validation='date'>
      </div>
      
    </div>
    
    <div class='as-form-parents tab'>
      <input type='text' name='mothers_name' placeholder='Mothers Name' data-validation='string'>
      <input type='tel' name='mothers_phone' placeholder='Mothers Phone Number' pattern='[0-9]' data-validation='phone'>
      <input type='text' name='fathers_name' placeholder='Fathers Name' data-validation='string''>
      <input type='tel' name='fathers_phone' placeholder='Fathers Phone Number' pattern='[0-9]' data-validation='phone'>
      <input type="text" name='notes' placeholder="Notes">
    </div>
    
      
    <div>
      <button type="button" class='btn' id="prevBtn">STUDENT INFO</button>
      <button type="button" class='btn' id="nextBtn">PARENTS INFO</button>
      <input type='submit' value='SUBMIT' name='form-submit'>
    </div>
    
  </form>
  `;
  // Adds close button to modal
  modalClose(modal, innerModal);

  // Selecting form and form tabs, also index for first tab
  const formSubmit = document.querySelector('.as-form');
  const formTab = document.querySelectorAll('.tab');
  let currentTabIndex = 0;

  // Shows first tab of the form
  function showFormTab(n) {
    formTab[n].style.display = 'grid';
    document.querySelector('#prevBtn').style.display = 'none';
    document.querySelector('input[type="submit"]').style.display = 'none';
  }
  showFormTab(currentTabIndex);

  // Shows next form tab or switches to previous tab
  function nextFormTab(n) {
    formTab[currentTabIndex].style.display = 'none';
    currentTabIndex += n;
    formTab[currentTabIndex].style.display = 'grid';
    if (currentTabIndex !== 0) {
      document.querySelector('#nextBtn').style.display = 'none';
      document.querySelector('#prevBtn').style.display = 'inline';
      document.querySelector('input[type="submit"]').style.display = 'inline';
    } else {
      document.querySelector('#nextBtn').style.display = 'inline';
      document.querySelector('#prevBtn').style.display = 'none';
      document.querySelector('input[type="submit"]').style.display = 'none';
    }
  }

  // Form "next" and "previous" button
  document.querySelector('#nextBtn').addEventListener('click', () => {
    nextFormTab(1);
  });
  document.querySelector('#prevBtn').addEventListener('click', () => {
    nextFormTab(-1);
  });

  // function formSubmitData(e) {
  //   e.preventDefault();

  //   function insertErrorMessage(input, errText) {
  //     const errorMessagesEl = document.createElement('p');
  //     errorMessagesEl.classList.add('input-err-msg');
  //     errorMessagesEl.textContent = errText;
  //     input.insertAdjacentElement('beforeend', errorMessagesEl);
  //   }

  //   function formValidation() {
  //     const errorMessages = {
  //       empty: 'Field cant be empty',
  //     };

  //     const formInputs = formSubmit.querySelectorAll('input');
  //     formInputs.forEach(input => {
  //       if (
  //         (input.name === 'first_name' ||
  //           input.name === 'last_name' ||
  //           input.name === 'birth_date' ||
  //           input.name === 'start_kg_date') &&
  //         input.value === ''
  //       ) {
  //         insertErrorMessage(input.parentElement, errorMessages.empty);
  //       }
  //     });
  //   }
  //   formValidation();
  //   // const url = 'http://localhost:3000/wl';
  //   // fetch(url, {
  //   //   method: 'POST',
  //   //   body: JSON.stringify(getKeyValuesPairs(formSubmit)),
  //   //   headers: {
  //   //     'Content-Type': 'application/json',
  //   //   },
  //   // });
  //   // modal.classList.remove('modal-open');
  // }

  // formSubmit.addEventListener('submit', formSubmitData);
}
