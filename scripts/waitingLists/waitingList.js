import { modalClose } from '../groupLists/GroupModal.js';

const addItem = document.querySelector('.wl-add-item');
const formModal = document.querySelector('.modal');
const innerFormModal = formModal.firstElementChild;
const formSubmit = document.querySelector('.as-form');
console.log([...formSubmit.children]);

function getKeyValuesPairs(form) {
  const inputsArray = [...form.children];
  const paraisArray = inputsArray
    .filter(input => {
      if (input.type === 'text' || input.type === 'tel') {
        return input;
      }
    })
    .map(input => {
      return {input.name};
    });
  console.log(paraisArray);
}

getKeyValuesPairs(formSubmit);

function formSubmitData(e) {
  e.preventDefault();
  console.log(e.currentTarget);

  // const formData = new FormData(this);
  // console.log(formData);

  // const formPostData = fetch('http://localhost:3000/waiting-list', {
  //   method: 'post',
  //   body: formData,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
}

formSubmit.addEventListener('submit', formSubmitData);

function openForm() {
  formModal.classList.add('modal-open');
  modalClose(formModal, innerFormModal);
}

addItem.addEventListener('click', openForm);
