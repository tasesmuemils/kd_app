import { formatDistanceToNowStrict } from 'date-fns';
import { transformDate } from './utils.js';

export function groupStudentTmpl(modalData) {
  return `
    <form class="group-modal">
      <section class="modal-child-info">

        <div class="modal-child-name">
          <label>NAME</label>
          <input type="text" name='first_name' class="disabled-input" value="${
            modalData.first_name
          }" disabled>
          <label>LAST NAME</label>
          <input type="text" name="last_name" class="disabled-input" value="${
            modalData.last_name
          }" disabled>
          <label>GENDER</label>
          <select class='disabled-input' name='gender' disabled>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div class="modal-child-age">
          <div>
            <label>BIRTHDAY</label>
            <input type="text" name='birth_date' class="disabled-input" value="${
              modalData.birth_date
            }" disabled>
          </div>
          <div>
            <label>AGE</label>
            <p>${formatDistanceToNowStrict(
              new Date(transformDate(modalData.birth_date))
            )}</p>
          </div>
        </div>
      
      </section>
      <section class="modal-parents-info">
        <div class="modal-mother-info">
          <h4>MOTHER</h4>
          <label>NAME</label>
          <input type="text" name='mothers_name' class="disabled-input" value="${
            modalData.mothers_name
          }" disabled>
          <label>LAST NAME</label>
          <input type="text" name='mothers_last_name' class="disabled-input" value="${
            modalData.mothers_last_name
          }" disabled>
          <div class="modal-parents-phone">
            <i class="fas fa-phone"></i>
            <input type="text" name='mothers_phone' class="disabled-input" value="${
              modalData.mothers_phone
            }" disabled>
          </div>
        </div>
        <div class="modal-father-info">
          <h4>FATHER</h4>
          <label>NAME</label>
          <input type="text" name='fathers_name' class="disabled-input" value="${
            modalData.fathers_name
          }" disabled>
          <label>LAST NAME</label>
          <input type="text" name='fathers_last_name' class="disabled-input" value="${
            modalData.fathers_last_name
          }" disabled>
          <div class="modal-parents-phone">
            <i class="fas fa-phone"></i>
            <input type="text" name='fathers_phone' class="disabled-input" value="${
              modalData.fathers_phone
            }" disabled>
          <div>
        </div>
      </section>

      <section class="modal-child-notes">
          <h4>NOTES</h4>
          <textarea type="text" name='notes' class="disabled-input" value="${
            modalData.notes
          }" disabled>${modalData.notes}</textarea>
      </section>
      
      <section class="modal-control-btn">
        <button class='editItem btn'>EDIT</button>
        <button class='deleteItem btn'>DELETE</button> 
        <button class='saveItem btn hide'>SAVE</button>
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
          <textarea type="text" class='as-form-input' name='notes' placeholder="Notes"></textarea>
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
        <div class="modal-child-name">
          <label>NAME</label>
          <input type="text" name='first_name' class="disabled-input" value="${modalData.first_name}" disabled>
          <label>LAST NAME</label>
          <input type="text" name="last_name" class="disabled-input" value="${modalData.last_name}" disabled>
          <label>GENDER</label>
          <select class='disabled-input' name='gender' disabled>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div class="modal-child-age">
          <div>
            <label>BIRTHDAY</label>
            <input type="text" name='birth_date' class="disabled-input" value="${modalData.birth_date}" disabled>
          </div>
          <div>
            <label>AGE</label>
            <p>${modalData.birth_date}</p>
          </div>
          <div>
            <label>Date, when want to start</label>
            <input type="text" name='birth_date' class="disabled-input" value="${modalData.start_kg_date}" disabled>
          </div>
          
        </div>
    
      </section>
      <section class="modal-parents-info">
        <div class="modal-mother-info">
          <h4>MOTHER</h4>
          <label>NAME</label>
          <input type="text" name='mothers_name' class="disabled-input" value="${modalData.mothers_name}" disabled>
          <label>LAST NAME</label>
          <input type="text" name='mothers_last_name' class="disabled-input" value="${modalData.mothers_last_name}" disabled>
          <div class="modal-parents-phone">
            <i class="fas fa-phone"></i>
            <input type="text" name='mothers_phone' class="disabled-input" value="${modalData.mothers_phone}" disabled>
          </div>
        </div>
        <div class="modal-father-info">
          <h4>FATHER</h4>
          <label>NAME</label>
          <input type="text" name='fathers_name' class="disabled-input" value="${modalData.fathers_name}" disabled>
          <label>LAST NAME</label>
          <input type="text" name='fathers_last_name' class="disabled-input" value="${modalData.fathers_last_name}" disabled>
          <div class="modal-parents-phone">
            <i class="fas fa-phone"></i>
            <input type="text" name='fathers_phone' class="disabled-input" value="${modalData.fathers_phone}" disabled>
          <div>
        </div>
      </section>

      <section class="modal-child-notes">
          <h4>NOTES</h4>
          <textarea type="text" name='notes' class="disabled-input" value="${modalData.notes}" disabled>${modalData.notes}</textarea>
      </section>

      <section class="modal-control-btn">
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

export function sliderCardContent(groupData, students) {
  return `
    <figure>${groupData.group_icon}</figure>
    <h5 data-groupId='${groupData.id}'>${groupData.group_name}</h5>
    <p><span>${students.length}</span> /20</p>
  `;
}

export function studentRowTemplate(student, i, genderTranform) {
  return `
    <div class="table-cell-wrapper">
        <div class="table-cell">${i + 1}</div>
        <div class="table-cell">
          ${genderTranform(student.gender)}
          <p>${student.first_name} ${student.last_name}</p>
        </div>
    </div>
    <div class="table-cell age-cell">
      <i class="age-icon far fa-calendar-alt"></i>
      <p>${student.birth_date}</p>
    </div>
  `;
}
