export function genderTranform(gender) {
  return gender === 'Male'
    ? `<i class="fas fa-mars" style='background-color: #cbe4f9; color: #4C90C3; padding: 7px 9px;'></i>`
    : `<i class="fas fa-venus" style='background: #f5e0f7; color:#ac7ab8; padding: 8px 11px;'></i>`;
}
