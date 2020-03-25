import { makeRequest } from './handler';


const selectQuery = query => document.querySelector(query);

const getInput = () => {
  const searchIcon = selectQuery('.icon-wrap');
  const input = selectQuery('.search');
  searchIcon.addEventListener('click', () => {
    const query = input.value;
    const len = query.length;
    if (len > 3 && len <= 15) {
      makeRequest(query, ' ', 'addpoint');
    }
    input.value = '';
    return '';
  });
  input.onclick = () => searchIcon.classList.remove('vibrate');

  window.addEventListener('keypress', e => {
    if (e.key === searchIcon.dataset.key) {
      const query = input.value;
      const len = query.length;
      if (len > 3 && len <= 15) {
        makeRequest(query, ' ', 'addpoint');
      }
      input.value = '';
    }
    return '';
  });
  return '';
};

const animeSearch = () => {
  const searchIcon = selectQuery('.icon-wrap');
  searchIcon.classList.add('vibrate');
};

const load = () => {
  const date = selectQuery('.date');
  const currentDate = new Date().toString().slice(0, 33).replace(/\s/, ', ');
  let time = currentDate.slice(17, 25).split(':');
  let hour = time[0];
  if (String(hour) == '00') hour = 12;
  hour > 12 ? time = `${hour - 12}:${time[1]}:${time[2]}PM` : time = `${hour+':'+time[1]}AM`;
  date.innerHTML = currentDate.replace(/\d+:\d+:\d+/, time);
};


export { animeSearch, load, getInput };
