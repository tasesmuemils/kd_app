/* UTILS */

// Transforms gender string to icon
export function genderTranform(gender) {
  return gender === 'Male'
    ? `<i class="fas fa-mars" style='background-color: #cbe4f9; color: #4C90C3; padding: 7px 9px;'></i>`
    : `<i class="fas fa-venus" style='background: #f5e0f7; color:#ac7ab8; padding: 8px 11px;'></i>`;
}

// Tranforms date to dd.mm.yyyy
export function convertDatoToAge(birthdate) {
  const convertBirthDate = new Date(
    birthdate
      .split('.')
      .reverse()
      .join('/')
  );

  const dateNow = new Date();
  const diff = dateNow - convertBirthDate;
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(months / 12);
  const month = months % 12;
  return `${years} years and ${month} months old`;
}

// Gets input values form form and tranforms them in to key/values for object
export function getKeyValuesPairs(formInputs) {
  console.log(formInputs);
  const emptyObject = {};
  formInputs.map(input => {
    const key = input.name;
    return (emptyObject[key] = `${input.value}`);
  });
  console.log(emptyObject);
  return emptyObject;
}

// Closes modal
export function modalClose(modal, innerModal) {
  const closeModalEl = document.createElement('div');
  closeModalEl.classList.add('modal-close');
  closeModalEl.textContent = 'X';
  closeModalEl.addEventListener('click', () => {
    modal.classList.remove('modal-open');
  });
  innerModal.insertAdjacentElement('beforeend', closeModalEl);
}
