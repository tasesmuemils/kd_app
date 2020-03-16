const slider = document.querySelector('.slider');
const groupListEl = document.querySelector('.group-list');

async function fetchData() {
  const url = '../test_data/test_data.json';
  const response = await fetch(url);
  const data = await response.json();

  data.forEach(item => {
    sliderData(item);
  });
}

fetchData();

function sliderData(groupData) {
  const sliderInnerCard = document.createElement('div');
  sliderInnerCard.classList.add('sliderCard');
  sliderInnerCard.setAttribute('data-clicked', false);
  sliderInnerCard.addEventListener('click', e => {
    sliderClickHandling(slider);
    e.currentTarget.dataset.clicked = true;
    groupListEl.childNodes.forEach(table => {
      table.style.display = 'none';
      if (table.dataset.group_name === groupData.group_name) {
        table.style.display = 'grid';
      }
      console.log(table.dataset.group_name, groupData.group_name);
    });
  });
  sliderInnerCard.innerHTML = `
    <figure>${groupData.group_icon}</figure>
    <h5>${groupData.group_name}</h5>
    <p><span>${groupData.students.length}</span> /20</p>
  `;
  slider.insertAdjacentElement('beforeend', sliderInnerCard);
  // groupList(groupData);
  new GroupList(groupData, groupListEl);
}

function genderTranform(gender) {
  return gender === 'Male'
    ? `<i class="fas fa-mars" style='background-color: #cbe4f9; color: #4C90C3; padding: 7px 9px;'></i>`
    : `<i class="fas fa-venus" style='background: #f5e0f7; color:#ac7ab8; padding: 8px 11px;'></i>`;
}

function sliderClickHandling(sliderWrapper) {
  sliderWrapper.childNodes.forEach(card => (card.dataset.clicked = 'false'));
}

function GroupList(groupData, tableWrapper) {
  this.groupData = groupData;
  this.tableWrapper = tableWrapper;

  this.newTable(this.groupData);
}

GroupList.prototype.newTable = function(groupData) {
  const groupTable = document.createElement('table');
  groupTable.classList.add('table-style');
  groupTable.style.display = 'none';
  groupTable.setAttribute('data-group_name', `${groupData.group_name}`);
  // groupTable.style.display = 'none';
  groupData.students.forEach(student => {
    const studentRow = `
        <tr>
          <td>${genderTranform(student.gender)} ${student.first_name} ${
      student.last_name
    }</td>
          <td><i class="far fa-calendar-alt"></i>${student.birth_date}</td>
        </tr>
      `;
    groupTable.insertAdjacentHTML('beforeend', studentRow);
  });
  this.tableWrapper.insertAdjacentElement('afterbegin', groupTable);
};

// function groupList(groupData) {
//   const groupTable = document.createElement('table');
//   groupTable.classList.add('table-style');
//   groupTable.style.display = 'none';
//   groupTable.setAttribute('data-group_name', `${groupData.group_name}`);
//   // groupTable.style.display = 'none';
//   groupData.students.forEach(student => {
//     const studentRow = `
//         <tr>
//           <td>${genderTranform(student.gender)} ${student.first_name} ${
//       student.last_name
//     }</td>
//           <td><i class="far fa-calendar-alt"></i>${student.birth_date}</td>
//         </tr>
//       `;
//     groupTable.insertAdjacentHTML('beforeend', studentRow);
//   });
//   groupListEl.insertAdjacentElement('afterbegin', groupTable);
// }
