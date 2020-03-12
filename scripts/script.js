const slider = document.querySelector('.slider');

async function fetchData() {
  const url = './test_data/test_data.json';
  const response = await fetch(url);
  const data = await response.json();

  data.forEach(item => {
    console.log(item);
    sliderData(item);
  });
}

fetchData();

function sliderData(groupData) {
  const sliderInnerCard = document.createElement('div');
  sliderInnerCard.classList.add('sliderCard');
  sliderInnerCard.innerHTML = `
    <h3>${groupData.group_name}</h3>
    <h4>Children in group: ${groupData.students.length}/20</h4>
  `;
  slider.insertAdjacentElement('beforeend', sliderInnerCard);
}
