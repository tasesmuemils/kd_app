import { genderTranform, convertDatoToAge } from '../utils/utils.js';
// import { groupModal } from '../groupLists/GroupModal.js';

// Create GroupList Object
export function WaitingList(wlData, tableWrapper) {
  this.wlData = wlData;
  this.tableWrapper = tableWrapper;
  this.newTable(this.wlData);
}

WaitingList.prototype.newTable = function(wlData) {
  // Creates Table
  const wlTable = document.createElement('div');
  wlTable.classList.add('table-style');
  //   wlTable.style.display = 'none';
  //   groupTable.setAttribute('data-group_name', `${groupData.group_name}`);

  // For each student create table row
  console.log(wlData);
  wlData.forEach((student, i) => {
    const studentRow = document.createElement('div');
    studentRow.classList.add('table-row');
    // studentRow.addEventListener('click', () =>
    //   groupModal(document.querySelector('.modal'), student)
    // );
    const studentRowContent = `
            <div class="table-cell-wrapper">
                <div class="table-cell">${i + 1}</div>
                <div class="table-cell">${genderTranform(student.gender)} ${
      student.first_name
    } ${student.last_name}</div>
            </div>
            <div class="table-cell age-cell"><i class="age-icon far fa-calendar-alt"></i>${
              student.birth_date
            }</div>
        `;

    // Append row content to row and row to table
    studentRow.insertAdjacentHTML('beforeend', studentRowContent);
    wlTable.insertAdjacentElement('beforeend', studentRow);
  });
  this.tableWrapper.insertAdjacentElement('afterbegin', wlTable);
};
