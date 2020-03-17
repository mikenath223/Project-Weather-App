import { googleMaps } from "./location";
import makeRequest from "./handler";

const countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const selectQuery = query => document.querySelector(query);
const searchIcon = selectQuery(".icon-wrap");

const iconSwitch = weather => {
  const icon = selectQuery(".wi");
  const weatherDesc = selectQuery(".weather-desc");
  icon.classList = `wi wi-owm-${weather.id}`;
  weatherDesc.textContent = weather.description;
};

const checkWeather = data => {
  const weatherIcon = selectQuery(".umbrella");
  const advise = selectQuery(".advise>p");
  if (!/cloud/.test(data)) {
    weatherIcon.src = "../src/assets/fun.png";
    advise.textContent = "Go have fun.";
  }
};

const getInput = () => {
  const searchIcon = selectQuery(".icon-wrap");
  const input = selectQuery(".search");
  searchIcon.addEventListener("click", () => {
    const query = input.value;
    const len = query.length;
    if (len > 3 && len <= 15) {
      makeRequest(query, "");
    }
    return "";
  });
  input.onclick = () => searchIcon.classList.remove("vibrate");
  return "";
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
  let quest;
  if (query === "US") quest = "USA";
  location.textContent = `${city || "Unknown"}, ${quest ||
    countries.getName(query, "en") ||
    " Location"}`;
};

const switchLoader = () => {
  const top = selectQuery(".top-ad");
  const temp = selectQuery(".temp");
  const weather = selectQuery(".weather-more");
  const advise = selectQuery(".advise");
  const load = selectQuery('.load-wrap')
  top.style.visibility = "hidden";
  temp.style.visibility = "hidden";
  weather.style.visibility = "hidden";
  advise.style.visibility = "hidden";
  load.style.visibility = 'visible'

  setTimeout(() => {
    top.style.visibility = "visible";
    temp.style.visibility = "visible";
    weather.style.visibility = "visible";
    advise.style.visibility = "visible";
    load.style.visibility = 'hidden'
  }, 4000);
};

const renderData = (data, message) => {
  const tempElem = selectQuery(".temp-h1");
  if (!data) {
    tempElem.style.fontSize = "1em";
    tempElem.textContent = message;
  }
  switchLoader();

  const mainData = data.main;
  const { feels_like: feelsLike } = mainData;
  const { temp } = mainData;

  let newFeels = feelsLike * 1.8 + 32;
  newFeels = Math.round((newFeels + Number.EPSILON) * 100) / 100;

  let newTemp = temp * 1.8 + 32;
  newTemp = Math.round((newTemp + Number.EPSILON) * 100) / 100;
  const { country } = data.sys;
  const city = data.name;
  const { humidity } = mainData;
  const wind = data.wind.speed;
  const switchTemp = document.querySelector('input[type="checkbox"]');

  const feelsElem = selectQuery(".feels-score");
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

  if (switchTemp.checked) {
    toFaren(tempElem, newTemp, newFeels);
  } else {
    toCelsius(tempElem, temp, feelsLike);
  }

  showCountry(country, city);
  tempElem.style.fontSize = "8em";

  iconSwitch(data.weather[0]);
  selectQuery(".humid-score").textContent = `${humidity}%`;
  selectQuery(".wind-score").textContent = `${wind}mph`;

  switchTemp.addEventListener("change", e => {
    if (e.target.checked) {
      toFaren(tempElem, newTemp, newFeels);
    } else {
      toCelsius(tempElem, temp, feelsLike);
    }
  });
  checkWeather(data.weather[0].description);
  googleMaps(data.coord.lat, data.coord.lon);
};

export { animeSearch, load, showCountry, renderData, getInput };
