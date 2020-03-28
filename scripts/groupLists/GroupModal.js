import { convertDatoToAge, modalClose } from '../utils/utils.js';

// Creates modal for group list item
export function groupModal(modal, modalData) {
  modal.classList.add('modal-open');
  const innerModal = modal.firstElementChild;
  innerModal.innerHTML = `
    <section class="modal-child-info">
      <p>${modalData.first_name} ${modalData.last_name}</p>
      <p><i class="fas fa-birthday-cake"></i>${modalData.birth_date}</p>
      <p><i class="far fa-calendar-alt"></i>${convertDatoToAge(
        modalData.birth_date
      )}</p>
    </section>
    <section class="modal-parents-info">
      <div class="modal-mother-info">
        <p>Mothers name: ${modalData.mothers_name}</p>
        <p><i class="fas fa-phone"></i>${modalData.mothers_phone}</p></div>
      <div class="modal-father-info">
        <p>Fathers name: ${modalData.fathers_name}</p>
        <p><i class="fas fa-phone"></i>${modalData.fathers_phone}</p>
      </div>
    </sections>
    <section class="modal-child-notes">
      <p><i class="fas fa-sticky-note"></i>${modalData.notes}</p>
    </sections>
  `;
  modalClose(modal, innerModal);
}
