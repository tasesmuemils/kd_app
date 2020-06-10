export function groupStudentTmpl(modalData) {
  return `
    <form class="group-modal">
      <section class="modal-child-info">

        <div class="modal-child-name">
          <label>Name:</label>
          <input type="text" name='first_name' class="disabled-input" value="${modalData.first_name}" disabled>
          <label>Last name:</label>
          <input type="text" name="last_name" class="disabled-input" value="${modalData.last_name}" disabled>
        </div>
        <div>
          <i class="fas fa-birthday-cake"></i>
          <input type="text" name='birth_date' class="disabled-input" value="${modalData.birth_date}" disabled>
        </div>
        <p><i class="far fa-calendar-alt"></i> ${modalData.birth_date}</p>
        
      </section>
      <section class="modal-parents-info">
        <div class="modal-mother-info">
          <p>Mother: <input type="text" name='mothers_name' class="disabled-input" value="${modalData.mothers_name}" disabled><input type="text" name='mothers_name' class="disabled-input" value="${modalData.mothers_last_name}" disabled></p>
          <label><i class="fas fa-phone"></i></label>
          <input type="text" name='mothers_phone' class="disabled-input" value="${modalData.mothers_phone}" disabled>
        </div>
        <div class="modal-father-info">
          <p>Father: <input type="text" name='fathers_name' class="disabled-input" value="${modalData.fathers_name}" disabled><input type="text" name='mothers_name' class="disabled-input" value="${modalData.fathers_last_name}" disabled></p>
          <label><i class="fas fa-phone"></i></label>
          <input type="text" name='fathers_phone' class="disabled-input" value="${modalData.fathers_phone}" disabled>
        </div>
      </section>
      <section class="modal-child-notes">
        <label><i class="fas fa-sticky-note"></i></label>
        <input type="text" name='notes' class="disabled-input" value="${modalData.notes}" disabled>
      </section>
      <section class="modal-control-btn">
        <button class='editItem btn'>Edit</button>
        <button class='deleteItem btn'>Delete</button> 
        <button class='saveItem btn hide'>Save</button>
      </section>
    </form>
  `;
}

export function addToGroupForm() {
  return `
    <form class='as-form'>
      <h4>ADD STUDENT TO GROUP</h4>
      <div class="as-form-student as-form-select tab">
        <div class='input-control'>
          <select class='as-form-input' name='gender'>
            <option selected disabled hidden>Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <p class='error-msg'></p>
        </div>
        <div class='input-control'>
          <select class='as-form-input' name='groupId'>
            <option selected disabled hidden>Group</option>
          </select>
          <p class='error-msg'></p>
        </div>
        <div class='input-control'>
          <input type='text' class='as-form-input' name='first_name' placeholder='Name' data-validation='string'>
          <span class="separator"> </span>
          <p class='error-msg'></p>
        </div>
        <div class='input-control'>
          <input type='text' class='as-form-input' name='last_name' placeholder='Last Name' data-validation='string'>
          <span class="separator"> </span>
          <p class='error-msg'></p>
        </div>
        <div class='input-control'>
          <input type='date' class='as-form-input flatpickr' name='birth_date' placeholder='Birthday' data-validation='date'>
          <span class="separator"> </span>
          <p class='error-msg'></p>
        </div>
      </div>
      
      <div class='as-form-parents tab'>
        <div class='input-control'>
          <input type='text' class='as-form-input' name='mothers_name' placeholder='Mothers Name' data-validation='string'>
          <span class="separator"> </span>
        </div>
        <div class='input-control'>
          <input type='text' class='as-form-input' name='mothers_last_name' placeholder='Mothers Last Name' data-validation='string'>
          <span class="separator"> </span>
        </div>
        <div class='input-control'>
          <input type='tel' class='as-form-input' name='mothers_phone' placeholder='Mothers Phone Number' data-validation='phone'>
          <span class="separator"> </span>
        </div>
        <div class='input-control'>
          <input type='text' class='as-form-input' name='fathers_name' placeholder='Fathers Name' data-validation='string''>
          <span class="separator"> </span>
        </div>
        <div class='input-control'>
          <input type='text' class='as-form-input' name='fathers_last_name' placeholder='Fathers Last Name' data-validation='string''>
          <span class="separator"> </span>
        </div>
        <div class='input-control'>
          <input type='tel' class='as-form-input' name='fathers_phone' placeholder='Fathers Phone Number' data-validation='phone'>
          <span class="separator"> </span>
        </div>
        <div class='input-control'>
          <input type="text" class='as-form-input' name='notes' placeholder="Notes">
          <span class="separator"> </span>
        </div>
      </div>
        
      <div class='as-form-buttons'>
        <button type="button" class='btn' id="prevBtn">STUDENT INFO</button>
        <button type="button" class='btn' id="nextBtn">PARENTS INFO</button>
        <input type='submit' value='SUBMIT' name='form-submit'>
      </div>
      
    </form>
    `;
}

export function wlStudentTmpl(modalData) {
  return `
    <div class="wl-modal">
      <section class="modal-child-info">
        <input type="text" name='first_name' class="disabled-input" value="${modalData.first_name}" disabled>
        <input type="text" name="last_name" class="disabled-input" value="${modalData.last_name}" disabled>
        <label><i class="fas fa-birthday-cake"></i></label>
        <input type="text" name='birth_date' class="disabled-input" value="${modalData.birth_date}" disabled>
        <p><i class="far fa-calendar-alt"></i> ${modalData.birth_date}</p>
        <p>Date, when want to start: <input type="text" name='birth_date' class="disabled-input" value="${modalData.start_kg_date}" disabled></p>
      </section>
      <section class="modal-parents-info">
        <div class="modal-mother-info">
            <p>Mother: <input type="text" name='mothers_name' class="disabled-input" value="${modalData.mothers_name}" disabled><input type="text" name='mothers_name' class="disabled-input" value="${modalData.mothers_last_name}" disabled></p>
            <label><i class="fas fa-phone"></i></label>
            <input type="text" name='mothers_phone' class="disabled-input" value="${modalData.mothers_phone}" disabled>
        </div>
        <div class="modal-father-info">
            <p>Father: <input type="text" name='fathers_name' class="disabled-input" value="${modalData.fathers_name}" disabled><input type="text" name='mothers_name' class="disabled-input" value="${modalData.fathers_last_name}" disabled></p>
            <label><i class="fas fa-phone"></i></label>
            <input type="text" name='fathers_phone' class="disabled-input" value="${modalData.fathers_phone}" disabled>
        </div>
      </section>
      <section class="modal-child-notes">
          <label><i class="fas fa-sticky-note"></i></label>
          <input type="text" name='notes' class="disabled-input" value="${modalData.notes}" disabled>
      </section>
      <section>
        <button class='editItem btn'>Edit</button>
        <button class='saveItem btn hide'>Save</button>
        <button class='moveBtn btn'>Move to Group</button> 
        <button class='deleteItem btn'>Delete</button>
      </section>
      <div class="mtg-modal">
          <div class="mtg-inner-modal">
          
          </div>
      </div>
    </div>
    
  `;
}

export function addToWlForm() {
  return `
    <form class='as-form'>
      <h4>ADD STUDENT TO WAITING LIST</h4>
      <div class="as-form-student as-form-select tab">
        <div class='input-control'>
          <select class='as-form-input' name='gender'>
            <option selected disabled hidden>Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <p class='error-msg'></p>
        </div>
        <div class='input-control'>
          <input type='text' class='as-form-input' name='first_name' placeholder='Name' data-validation='string'>
          <span class="separator"> </span>
          <p class='error-msg'></p>
        </div>
        <div class='input-control'>
          <input type='text' class='as-form-input' name='last_name' placeholder='Last Name' data-validation='string'>
          <span class="separator"> </span>
          <p class='error-msg'></p>
        </div>
        <div class='input-control'>
          <input type='date' class='as-form-input flatpickr' name='birth_date' placeholder='Birthday' data-validation='date'>
          <span class="separator"> </span>
          <p class='error-msg'></p>
        </div>
        <div class='input-control'>
          <input type="text" class='as-form-input flatpickr' name='start_kg_date' placeholder='Date, when want to start' data-validation='date'>
          <span class="separator"> </span>
          <p class='error-msg'></p>
        </div>
        
      </div>
      
      <div class='as-form-parents tab'>
        <div class='input-control'>
          <input type='text' class='as-form-input' name='mothers_name' placeholder='Mothers Name' data-validation='string'>
          <span class="separator"> </span>
        </div>
        <div class='input-control'>
          <input type='text' class='as-form-input' name='mothers_last_name' placeholder='Mothers Last Name' data-validation='string'>
          <span class="separator"> </span>
        </div>
        <div class='input-control'>
          <input type='tel' class='as-form-input' name='mothers_phone' placeholder='Mothers Phone Number' data-validation='phone'>
          <span class="separator"> </span>
        </div>
        <div class='input-control'>
          <input type='text' class='as-form-input' name='fathers_name' placeholder='Fathers Name' data-validation='string''>
          <span class="separator"> </span>
        </div>
        <div class='input-control'>
          <input type='text' class='as-form-input' name='fathers_last_name' placeholder='Fathers Last Name' data-validation='string''>
          <span class="separator"> </span>
        </div>
        <div class='input-control'>
          <input type='tel' class='as-form-input' name='fathers_phone' placeholder='Fathers Phone Number' data-validation='phone'>
          <span class="separator"> </span>
        </div>
        <div class='input-control'>
          <input type="text" class='as-form-input' name='notes' placeholder="Notes">
          <span class="separator"> </span>
        </div>
      </div>
        
      <div class='as-form-buttons'>
        <button type="button" class='btn' id="prevBtn">STUDENT INFO</button>
        <button type="button" class='btn' id="nextBtn">PARENTS INFO</button>
        <input type='submit' value='SUBMIT' name='form-submit'>
      </div>
      
    </form>
    `;
}
