import makeRequest from "./handler";


const selectQuery = query => document.querySelector(query);

const searchIcon = selectQuery(".search-icon");
const getInput = () => {
  const input = selectQuery('.search');
  input.onclick = () => searchIcon.classList.remove("vibrate");
  searchIcon.addEventListener("click", () => {
    const query = input.value;
    const len = query.length;
    if (len > 3 && len <= 15) {
      return makeRequest(query, '');
    }
  });
};

const animeSearch = () => {
  searchIcon.classList.add("vibrate");
};

const load = () => {
  const date = selectQuery(".date");

  let currentDate = new Date();
  currentDate = currentDate
    .toLocaleString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    })
    .split(",");

  date.innerHTML = `
  ${currentDate[3]} ${currentDate[0].toUpperCase()}, <br> <span class="day"> ${
    currentDate[1]
  } ${currentDate[2]}</span> 
  `;
};

const showCountry = (query, city) => {
  const location = selectQuery('.location');
  let countries = require("i18n-iso-countries");
  countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
  let quest;
  if (query == 'US') quest = 'USA';
  location.textContent = `${city}, ${quest || countries.getName(query, 'en')}`;
}

// const renderData = (data) => {
//   data.
// }

export { getInput, animeSearch, load, showCountry, selectQuery };