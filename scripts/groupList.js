import { GroupList } from './groupLists/newGroupTable.js';

const slider = document.querySelector('.slider');
const groupListEl = document.querySelector('.group-list');

function sliderClickHandling(sliderWrapper) {
  sliderWrapper.childNodes.forEach(card => (card.dataset.clicked = 'false'));
}

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

async function fetchData() {
  const urlGroups = 'http://localhost:3000/groups';
  const response = await fetch(urlGroups);
  console.log(response);
  const data = await response.json();

  data.forEach(item => {
    sliderData(item);
  });
}

fetchData();
