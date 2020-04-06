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
        <select class='as-form-input' name='gender'>
          <option>Male</option>
          <option>Female</option>
        </select>
        <p class='error-msg'></p>
      </div>
      <div class='input-control'>
        <input type='text' class='as-form-input' name='first_name' placeholder='Name' data-validation='string'>
        <p class='error-msg'></p>
      </div>
      <div class='input-control'>
        <input type='text' class='as-form-input' name='last_name' placeholder='Last Name' data-validation='string'>
        <p class='error-msg'></p>
      </div>
      <div class='input-control'>
        <input type='date' class='as-form-input' name='birth_date' placeholder='Birthday' data-validation='date'>
        <p class='error-msg'></p>
      </div>
      <div class='input-control'>
        <input type='date' class='as-form-input' name='start_kg_date' placeholder='Date, when want to start' data-validation='date'>
        <p class='error-msg'></p>
      </div>
      
    </div>
    
    <div class='as-form-parents tab'>
      <input type='text' class='as-form-input' name='mothers_name' placeholder='Mothers Name' data-validation='string'>
      <input type='tel' class='as-form-input' name='mothers_phone' placeholder='Mothers Phone Number' pattern='[0-9]' data-validation='phone'>
      <input type='text' class='as-form-input' name='fathers_name' placeholder='Fathers Name' data-validation='string''>
      <input type='tel' class='as-form-input' name='fathers_phone' placeholder='Fathers Phone Number' pattern='[0-9]' data-validation='phone'>
      <input type="text" class='as-form-input' name='notes' placeholder="Notes">
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
    if (!formValidation()) return false;
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

  // Form validation
  function formValidation() {
    // Error messages element handling
    function insertErrorMessage(errElement, errText) {
      errElement.classList.add('input-err-msg');
      errElement.textContent = errText;
    }

    // Object with error messages
    const errorMessages = {
      empty: 'Field cant be empty',
    };

    // If input value is empty
    const formInputs = formSubmit.querySelectorAll('.as-form-student input');
    console.log(formInputs);
    let valid = true;
    formInputs.forEach(input => {
      console.log();
      // Error messages element
      const errorMsgEl = input.parentElement.lastElementChild;
      if (input.value === '') {
        // If input value is empty
        insertErrorMessage(errorMsgEl, errorMessages.empty);
        valid = false;
      } else if (valid) {
        // errorMsgEl.style.opacity = 0;
        insertErrorMessage(errorMsgEl, '');
      }
    });
    return valid;
  }

  function formSubmitData(e) {
    e.preventDefault();
    // getKeyValuesPairs(formSubmit);

    formValidation();
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
