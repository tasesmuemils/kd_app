export function groupModal(modal, modalData) {
  modal.classList.add('modal-open');
  const innerModal = modal.firstElementChild;
  innerModal.innerHTML = `
    <div>${modalData.first_name} ${modalData.last_name} ${modalData.birth_date} ${modalData.gender} ${modalData.mothers_name} ${modalData.mothers_phone} ${modalData.fathers_name} ${modalData.fathers_phone} ${modalData.notes}</div>
  `;
}
