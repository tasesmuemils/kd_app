import { genderTranform } from '../utils/utils.js';

export function GroupList(groupData, tableWrapper) {
  this.groupData = groupData;
  this.tableWrapper = tableWrapper;
  this.newTable(this.groupData);
}

GroupList.prototype.newTable = function(groupData) {
  const groupTable = document.createElement('div');
  groupTable.classList.add('table-style');
  groupTable.style.display = 'none';
  groupTable.setAttribute('data-group_name', `${groupData.group_name}`);
  // groupTable.style.display = 'none';
  groupData.students.forEach((student, i) => {
    const studentRow = `
          <div class="table-row">
            <div class="table-cell-wrapper">
                <div class="table-cell">${i + 1}</div>
                <div class="table-cell">${genderTranform(student.gender)} ${
      student.first_name
    } ${student.last_name}</div>
            </div>
            <div class="table-cell"><i class="age-icon far fa-calendar-alt"></i>${
              student.birth_date
            }</div>
          </div>
        `;
    groupTable.insertAdjacentHTML('beforeend', studentRow);
  });
  this.tableWrapper.insertAdjacentElement('afterbegin', groupTable);
};
