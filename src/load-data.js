import Umbrella from "../assets/umbrella.png";
import Fun from "../assets/fun.png";
import BgStorm from "../assets/wall1.jpg";
import BgFun from "../assets/wall2.jpg";
import BgClear from "../assets/scenic.jpg";
import BgClouds from "../assets/thunderstorm.jpg";
import SmStorm from "../assets/wall1-mobile.jpg";
import SmFun from "../assets/sunny-mobile.jpg";
import SmClear from "../assets/scenic-mobile.jpg";
import SmClouds from "../assets/thunderstorm-mobile.jpg";

const selectQuery = query => document.querySelector(query);
const countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const iconSwitch = weather => {
  const icon = selectQuery(".wi");
  const weatherDesc = selectQuery(".weather-desc");
  icon.classList = `wi wi-owm-${weather.id}`;
  weatherDesc.textContent = weather.description;
};

const checkWeather = data => {
  const weatherIcon = selectQuery(".umbrella");
  const advise = selectQuery(".advise>p");
  const container = selectQuery(".container");
  if (!/cloud|rain|storm/.test(data)) {
    weatherIcon.src = _fun2.default;
    advise.textContent = "Go have fun.";
    if (window.screen.width == 769) {
      container.setAttribute(
        "style",
        "background-image: url(" + _sunnyMobile2.default + ")"
      );
    } else {
      container.setAttribute(
        "style",
        "background-image: url(" + _wall4.default + ")"
      );
    }
  } else if (/clear/.test(data)) {
    if (window.screen.width == 769) {
      container.setAttribute(
        "style",
        "background-image: url(" + _scenic2.default + ")"
      );
    } else {
      container.setAttribute(
        "style",
        "background-image: url(" + _scenicMobile2.default + ")"
      );
    }
  } else if (/storm/.test(data)) {
    if (window.screen.width == 769) {
      container.setAttribute(
        "style",
        "background-image: url(" + _wall1Mobile2.default + ")"
      );
    } else {
      container.setAttribute(
        "style",
        "background-image: url(" + _wall2.default + ")"
      );
    }
    weatherIcon.src = _umbrella2.default;
    advise.textContent = "You might get wet out there.";
  } else {
    if (window.screen.width == 769) {
      container.setAttribute(
        "style",
        "background-image: url(" + _thunderstormMobile2.default + ")"
      );
    } else {
      container.setAttribute(
        "style",
        "background-image: url(" + _thunderstorm2.default + ")"
      );
    }
    weatherIcon.src = _umbrella2.default;
    advise.textContent = "You might get wet out there.";
  }
};

const toCelsius = (tempElem, temp, Feels, feelsElem) => {
  tempElem.innerHTML = `${temp} <span class="cel">C</span>`;
  document.body.style.setProperty("--farendisplay", "none");
  document.body.style.setProperty("--celdisplay", "initial");
  feelsElem.innerHTML = `${Feels}<span class="togg feels-temp">C</span>`;
};

const toFaren = (tempElem, newTemp, like, feelsElem) => {
  tempElem.innerHTML = `${newTemp} <span class="faren">F</span>`;
  document.body.style.setProperty("--celdisplay", "none");
  document.body.style.setProperty("--farendisplay", "initial");
  feelsElem.innerHTML = `${like}<span class="togg">F</span>`;
};

const showCountry = (query, city) => {
  const location = selectQuery(".location");
  let quest;
  if (query === "US") quest = "USA";
  location.textContent = `${city || "Unknown"}, ${quest ||
    countries.getName(query, "en") ||
    " Location"}`;
};

const renderData = (data, message) => {
  const tempElem = selectQuery(".temp-h1");
  if (!data) {
    tempElem.textContent = message;
    tempElem.style.fontSize = "18px";
  }

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

  if (switchTemp.checked) {
    toFaren(tempElem, newTemp, newFeels, feelsElem);
  } else {
    toCelsius(tempElem, temp, feelsLike, feelsElem);
  }

  showCountry(country, city);
  iconSwitch(data.weather[0]);
  selectQuery(".humid-score").textContent = `${humidity}%`;
  selectQuery(".wind-score").textContent = `${wind}mph`;

  switchTemp.addEventListener("change", e => {
    if (e.target.checked) {
      toFaren(tempElem, newTemp, newFeels, feelsElem);
    } else {
      toCelsius(tempElem, temp, feelsLike, feelsElem);
    }
  });
  checkWeather(data.weather[0].description);
};

const switchLoader = data => {
  const top = selectQuery(".top-ad");
  const temp = selectQuery(".temp");
  const weather = selectQuery(".weather-more");
  const advise = selectQuery(".advise");
  const load = selectQuery(".load-wrap");
  top.style = "opacity: 0";
  temp.style = "opacity: 0";
  weather.style = "opacity: 0";
  advise.style = "opacity: 0";
  load.style = "opacity: 1";

  setTimeout(() => {
    top.style = "opacity: 1";
    temp.style = "opacity: 1";
    weather.style = "opacity: 1";
    advise.style = "opacity: 1";
    load.style = "opacity: 0";
    renderData(data);
  }, 3500);
};

var getTimeCoords = async function getTimeCoords(lat, lng) {
  var response = await fetch(
    `http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lng}&username=mikenath223`,
    {
      mode: "cors"
    }
  );
  response.json().then(function(data) {
    const date = selectQuery(".date");

    let day = new Date(data.time.slice(0, 9))
      .toString()
      .slice(0, 15)
      .replace(/\s/, ", ");

    let time = day.slice(17, 25).split(":");
    let hour = time[0];
    if (String(hour) == "00") hour = 12;
    hour > 12
      ? (time = `${hour - 12}:${time[1]}:${time[2]}PM`)
      : (time = `${hour + ":" + time[1]}AM`);
    date.innerHTML = day + " <br/> " + time;

    console.log("====================================");
    console.log(JSON.stringify(data.time));
    console.log("====================================");
  });
};

export { switchLoader, getTimeCoords };
