import makeRequest from "./handler";
import { iconSwitch } from "./app-interface";

const selectQuery = query => document.querySelector(query);
const searchIcon = selectQuery(".icon-wrap");
const getInput = () => {
  const input = selectQuery(".search");
  input.onclick = () => searchIcon.classList.remove("vibrate");
  searchIcon.addEventListener("click", () => {
    const query = input.value;
    console.log(query);

    const len = query.length;
    if (len > 3 && len <= 15) {
      return makeRequest(query, "");
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
  const location = selectQuery(".location");
  let countries = require("i18n-iso-countries");
  countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
  let quest;
  if (query == "US") quest = "USA";
  location.textContent = `${city}, ${quest || countries.getName(query, "en")}`;
};

const renderData = (data, message) => {
  const toCelsius = (tempElem, temp) => {
    tempElem.textContent = temp;
    document.body.style.setProperty("--farendisplay", "none");
    document.body.style.setProperty("--celdisplay", "initial");
  }

  const toFaren = (tempElem, newTemp) => {
    tempElem.textContent = newTemp;
    document.body.style.setProperty("--celdisplay", "none");
    document.body.style.setProperty("--farendisplay", "initial");
  }

  const tempElem = selectQuery(".temp-h1");
  if (!data) {
    tempElem.style.fontSize = "1em";
    tempElem.textContent = message;
  }
  const country = data.sys.country;
  const city = data.name;
  const mainData = data.main;
  const temp = mainData.temp;
  const humidity = mainData.humidity;
  const pressure = mainData.pressure;
  const feelsLike = mainData.feels_like;
  const wind = data.wind.speed;
  const switchTemp = document.querySelector('input[type="checkbox"]');
  let newTemp = temp * 1.8 + 32;
  newTemp = Math.round((newTemp + Number.EPSILON) * 100) / 100

  if (switchTemp.checked) {
    toFaren(tempElem, newTemp);
  } else {
    toCelsius(tempElem, temp);
  }
  
  showCountry(country, city);
  tempElem.style.fontSize = "8em";
  console.log(data.weather[0].id);
  
  iconSwitch(data.weather[0].id)
  selectQuery(".humid-score").textContent = `${humidity}%`;
  selectQuery(".wind-score").textContent = `${wind}mph`;
  switchTemp.addEventListener("change", function(e) {
    if (e.target.checked) {
      toFaren(tempElem, newTemp);
    } else {
      toCelsius(tempElem, temp);
    }
  });
};

export { getInput, animeSearch, load, showCountry, selectQuery, renderData };

