import makeRequest from './handler';


const selectQuery = query => document.querySelector(query);
const searchIcon = selectQuery('.icon-wrap');

const getInput = () => {
  const searchIcon = selectQuery('.icon-wrap');
  const input = selectQuery('.search');
  searchIcon.addEventListener('click', () => {
    const query = input.value;
    const len = query.length;
    if (len > 3 && len <= 15) {
      makeRequest(query, '');
    }
    return '';
  });
  input.onclick = () => searchIcon.classList.remove('vibrate');
  return '';
};

const animeSearch = () => {
  searchIcon.classList.add('vibrate');
};

const load = () => {
  const date = selectQuery('.date');

  let currentDate = new Date();
  currentDate = currentDate
    .toLocaleString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .split(',');

  date.innerHTML = `
  ${currentDate[3]} ${currentDate[0].toUpperCase()}, <br> <span class="day"> ${
  currentDate[1]
} ${currentDate[2]}</span> 
  `;
};


export { animeSearch, load, getInput };
