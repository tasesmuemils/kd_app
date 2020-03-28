import { genderTranform, convertDatoToAge } from '../utils/utils.js';
import { groupModal } from './GroupModal.js';

// Create GroupList Object
export function GroupList(groupData, tableWrapper) {
  this.groupData = groupData;
  this.tableWrapper = tableWrapper;
  this.newTable(this.groupData);
}

GroupList.prototype.newTable = function(groupData) {
  // Creates Table
  const groupTable = document.createElement('div');
  groupTable.classList.add('table-style');
  groupTable.style.display = 'none';
  groupTable.setAttribute('data-group_name', `${groupData.group_name}`);

  // For each student create table row
  groupData.students.forEach((student, i) => {
    const studentRow = document.createElement('div');
    studentRow.classList.add('table-row');
    studentRow.addEventListener('click', () =>
      groupModal(document.querySelector('.modal'), student)
    );
    const studentRowContent = `
            <div class="table-cell-wrapper">
                <div class="table-cell">${i + 1}</div>
                <div class="table-cell">${genderTranform(student.gender)} ${
      student.first_name
    } ${student.last_name}</div>
            </div>
            <div class="table-cell age-cell"><i class="age-icon far fa-calendar-alt"></i>${convertDatoToAge(
              student.birth_date
            )}</div>
        `;

    // Append row content to row and row to table
    studentRow.insertAdjacentHTML('beforeend', studentRowContent);
    groupTable.insertAdjacentElement('beforeend', studentRow);
  });
  this.tableWrapper.insertAdjacentElement('afterbegin', groupTable);
};
