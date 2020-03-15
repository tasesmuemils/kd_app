const slider = document.querySelector('.slider');
const groupListEl = document.querySelector('.group-list');

async function fetchData() {
  const url = './test_data/test_data.json';
  const response = await fetch(url);
  const data = await response.json();

  data.forEach(item => {
    sliderData(item);
    groupList(item);
  });
}

fetchData();

function sliderData(groupData) {
  const sliderInnerCard = document.createElement('div');
  sliderInnerCard.classList.add('sliderCard');
  sliderInnerCard.innerHTML = `
    <figure>${groupData.group_icon}</figure>
    <h5>${groupData.group_name}</h5>
    <p><span>${groupData.students.length}</span> /20</p>
  `;
  slider.insertAdjacentElement('beforeend', sliderInnerCard);
}

function genderTranform(gender) {
  return gender === 'Male'
    ? `<i class="fas fa-mars" style='background-color: #cbe4f9; color: #4C90C3; padding: 7px 9px;'></i>`
    : `<i class="fas fa-venus" style='background: #f5e0f7; color:#ac7ab8; padding: 8px 11px;'></i>`;
}

function groupList(groupData) {
  const groupTable = document.createElement('table');
  groupTable.classList.add('table-style');
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
  groupListEl.insertAdjacentElement('afterbegin', groupTable);
}

/* <tr>
<td><div>${genderTranform(student.gender)}</div></td>
<td>${student.first_name} ${student.last_name}</td>
<td>${student.birth_date}</td>
</tr> */
