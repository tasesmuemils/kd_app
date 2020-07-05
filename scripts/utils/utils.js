/* UTILS */

// Transforms gender string to icon
export function genderTranform(gender) {
  return gender === 'Male'
    ? `<i class="fas fa-mars" style='background-color: #cbe4f9; color: #4C90C3; padding: 7px 9px;'></i>`
    : `<i class="fas fa-venus" style='background: #f5e0f7; color:#ac7ab8; padding: 8px 11px;'></i>`;
}

// Tranforms dd.mm.yyyy to date to use in date-fns
export function transformDate(dbDate) {
  let convertedDate = dbDate
    .toString()
    .split('.')
    .reverse();
  if (
    convertedDate[1].split('')[0] == 0 ||
    convertedDate[2].split('')[0] == 0
  ) {
    const editedConvertedDate = convertedDate.map(item => {
      if (item.split('')[0] == 0) {
        const itemEdit = item.split('');
        itemEdit.shift();
        return itemEdit[0];
      }
      return item;
    });
    convertedDate = editedConvertedDate;
  }

  return convertedDate.join(', ');
}

// Gets input values form form and tranforms them in to key/values for object
export function getKeyValuesPairs(formInputs) {
  const emptyObject = {};
  formInputs.map(input => {
    const key = input.name;
    return (emptyObject[key] = `${input.value}`);
  });
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

// FORM PAGES
export function formPages(formTab, formSubmit) {
  // Current tab index
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
    if (!formValidation(formSubmit.querySelectorAll('.as-form-student input')))
      return false;
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
}

// FORM VALIDATION
export function formValidation(formStudentInputs) {
  // Error messages element handling
  function insertErrorMessage(errElement, errText) {
    errElement.classList.add('input-err-msg');
    errElement.textContent = errText;
  }

  // Object with error messages
  const errorMessages = {
    empty: 'Field cant be empty',
  };

  // // If input value is empty
  let valid = true;
  formStudentInputs.forEach(input => {
    // Error messages element
    const errorMsgEl = input.parentElement.lastElementChild;
    if (input.value === '') {
      // If input value is empty
      insertErrorMessage(errorMsgEl, errorMessages.empty);
      valid = false;
    } else if (valid) {
      insertErrorMessage(errorMsgEl, '');
    }
  });
  return valid;
}

// SORT AND SEARCH

// SORT
export function sortStudents(sortOptions, arraySort, studentTable) {
  arraySort.sort((a, b) => {
    if (sortOptions.selectedIndex === 1) {
      if (
        a.firstElementChild.lastElementChild.lastElementChild.textContent <
        b.firstElementChild.lastElementChild.lastElementChild.textContent
      ) {
        return -1;
      }
    } else if (sortOptions.selectedIndex === 2) {
      if (
        a.firstElementChild.lastElementChild.lastElementChild.textContent >
        b.firstElementChild.lastElementChild.lastElementChild.textContent
      ) {
        return -1;
      }
    }
  });

  studentTable.innerHTML = '';
  arraySort.forEach(sortedRow => {
    studentTable.appendChild(sortedRow);
  });
}
// SORT END

// SEARCH
export function searchStudent(searchBar, studentItems) {
  const filterValue = searchBar.value.toLowerCase();
  studentItems.forEach(item => {
    const name =
      item.firstElementChild.lastElementChild.lastElementChild.textContent;
    if (name.toLowerCase().indexOf(filterValue) > -1) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}
// SEARCH END
