export function addPersonFormTmpl() {
  return `
    <form class='create-person-form'>
        <h4>ADD PERSON</h4>
        <div>
            <div class='input-control'>
                <input type='text' class='as-form-input' name='name' placeholder='Name'
                    data-validation='string'>
                <span class="separator"> </span>
            </div>
            <div class='input-control'>
                <input type='text' class='as-form-input' name='surname' placeholder='Last Name'
                    data-validation='string'>
                <span class="separator"> </span>
            </div>
            <div class='input-control'>
                <input type='date' class='as-form-input flatpickr' name='birthDate'
                    placeholder='Birthday' data-validation='date'>
                <span class="separator"> </span>
            </div>
            <div class='input-control'>
                <select class='as-form-input' name='gender'>
                    <option selected disabled hidden>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </div>
            <div class='input-control'>
                <input type='text' class='as-form-input' name='phoneNumber' placeholder='Phone number'
                    data-validation='string'>
                <span class="separator"> </span>
            </div>
            <div class='input-control'>
                <input type='text' class='as-form-input' name='email' placeholder='email'
                    data-validation='string'>
                <span class="separator"> </span>
            </div>
        </div>
        <div class='as-form-buttons'>
            <input type='submit' value='ADD PERSON' name='form-submit'>
        </div>
    </form>
    `;
}

export function searchPersonFormTmpl() {
  return `
      <form class='find-person-form'>
          <h4>SEARCH PERSON</h4>
          <div class="search-bar">
            <input type="text" class="searchBar form-input" placeholder="Person name" name='name'>
            <button class='findPerson btn'>Find</button>
          </div>
      </form>
      <div class='search-results'></div>
    `;
}
