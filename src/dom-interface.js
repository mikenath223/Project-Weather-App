import makeRequest from "./handler";
import { iconSwitch, checkWeather } from "./app-interface";
import { googleMaps } from './location';

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
  location.textContent = `${city || "Unknown"}, ${quest ||
    countries.getName(query, "en") ||
    " Location"}`;
};

const renderData = (data, message) => {
  const mainData = data.main;
  const feels_like = mainData.feels_like;
  const temp = mainData.temp;
  
  let newFeels = feels_like * 1.8 + 32;
  newFeels = Math.round((newFeels + Number.EPSILON) * 100) / 100;
  
  let newTemp = temp * 1.8 + 32;
  newTemp = Math.round((newTemp + Number.EPSILON) * 100) / 100;
  const country = data.sys.country;
  const city = data.name;
  const humidity = mainData.humidity;
  const wind = data.wind.speed;
  const switchTemp = document.querySelector('input[type="checkbox"]');


  let feelsElem = selectQuery(".feels-score");
  const toCelsius = (tempElem, temp, Feels) => {
    tempElem.textContent = temp;
    document.body.style.setProperty("--farendisplay", "none");
    document.body.style.setProperty("--celdisplay", "initial");
    feelsElem.innerHTML = `${Feels}<span class="togg">C</span>`;
  };

  const toFaren = (tempElem, newTemp, like) => {  
    tempElem.textContent = newTemp;
    document.body.style.setProperty("--celdisplay", "none");
    document.body.style.setProperty("--farendisplay", "initial");
    feelsElem.innerHTML = `${like}<span class="togg">F</span>`;
  };

  const tempElem = selectQuery(".temp-h1");
  if (!data) {
    tempElem.style.fontSize = "1em";
    tempElem.textContent = message;
  }

  if (switchTemp.checked) {
    toFaren(tempElem, newTemp, newFeels);
  } else {
    toCelsius(tempElem, temp, feels_like);
  }
  
  showCountry(country, city);
  tempElem.style.fontSize = "8em";

  iconSwitch(data.weather[0]);
  selectQuery(".humid-score").textContent = `${humidity}%`;
  selectQuery(".wind-score").textContent = `${wind}mph`;

  switchTemp.addEventListener("change", (e)=> {
    if (e.target.checked) {
      toFaren(tempElem, newTemp, newFeels);
    } else {
      toCelsius(tempElem, temp, feels_like);
    }
  });
  checkWeather(data.weather[0].description)
  googleMaps(data.coord.lat, data.coord.lon);
};

export { getInput, animeSearch, load, showCountry, selectQuery, renderData };
