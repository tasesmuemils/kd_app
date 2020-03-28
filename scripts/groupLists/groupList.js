import { GroupList } from './newGroupTable.js';

const slider = document.querySelector('.slider');
const groupListEl = document.querySelector('.group-list');

// Gets data from groups
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

// When card is clicked, clicked = false
function sliderClickHandling(sliderWrapper) {
  console.log(sliderWrapper.childNodes);
  sliderWrapper.childNodes.forEach(card => (card.dataset.clicked = 'false'));
}

// Create a slider card deppending on how many groups there are
function sliderData(groupData) {
  const sliderInnerCard = document.createElement('div');
  sliderInnerCard.classList.add('sliderCard');
  sliderInnerCard.setAttribute('data-clicked', false);
  sliderInnerCard.addEventListener('click', e => {
    // Before adding clicked = true, every slider clicked turns to false
    sliderClickHandling(slider);
    e.currentTarget.dataset.clicked = true;
    groupListEl.childNodes.forEach(table => {
      table.style.display = 'none';
      // If groups tables name attribute = group name from server, shows table
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
  new GroupList(groupData, groupListEl);
}
