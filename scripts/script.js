const slider = document.querySelector('.slider');
const groupListEl = document.querySelector('.group-list');

async function fetchData() {
  const url = './test_data/test_data.json';
  const response = await fetch(url);
  const data = await response.json();

  data.forEach(item => {
    console.log(item.students);
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

function groupList(groupData) {
  const groupTable = document.createElement('table');
  groupData.students.forEach(student => {
    const studentRow = `
        <tr>
          <td>${student.gender}</td>
          <td>${student.first_name}</td>
          <td>${student.last_name}</td>
        </tr>
      `;
    groupTable.insertAdjacentHTML('beforeend', studentRow);
  });
  groupListEl.insertAdjacentElement('afterbegin', groupTable);
}
