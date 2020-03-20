"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _umbrella = _interopRequireDefault(require("../src/assets/umbrella.png"));

var _fun = _interopRequireDefault(require("../src/assets/fun.png"));

var _wall = _interopRequireDefault(require("../src/assets/wall1.jpg"));

var _wall2 = _interopRequireDefault(require("../src/assets/wall2.jpg"));

var _scenic = _interopRequireDefault(require("../src/assets/scenic.jpg"));

var _gloomyClouds = _interopRequireDefault(require("../src/assets/gloomy-clouds.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var selectQuery = function selectQuery(query) {
  return document.querySelector(query);
};

var countries = require('i18n-iso-countries');

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

var iconSwitch = function iconSwitch(weather) {
  var icon = selectQuery('.wi');
  var weatherDesc = selectQuery('.weather-desc');
  icon.classList = "wi wi-owm-".concat(weather.id);
  weatherDesc.textContent = weather.description;
};

var checkWeather = function checkWeather(data) {
  var weatherIcon = selectQuery('.umbrella');
  var advise = selectQuery('.advise>p');
  var container = selectQuery('.container');

  if (!/cloud|rain|storm/.test(data)) {
    weatherIcon.src = _fun["default"];
    advise.textContent = 'Go have fun.';
    container.setAttribute('style', "background-image: url(".concat(_wall2["default"], ")"));
  } else if (/clear/.test(data)) {
    container.setAttribute('style', "background-image: url(".concat(_scenic["default"], ")"));
  } else if (/storm/.test(data)) {
    container.setAttribute('style', "background-image: url(".concat(_wall["default"], ")"));
    weatherIcon.src = _umbrella["default"];
    advise.textContent = 'You might get wet out there.';
  } else {
    weatherIcon.src = _umbrella["default"];
    advise.textContent = 'You might get wet out there.';
    container.setAttribute('style', "background-image: url(".concat(_gloomyClouds["default"], ")"));
  }
};

var switchLoader = function switchLoader() {
  var top = selectQuery('.top-ad');
  var temp = selectQuery('.temp');
  var weather = selectQuery('.weather-more');
  var advise = selectQuery('.advise');
  var load = selectQuery('.load-wrap');
  top.style = 'opacity: 0';
  temp.style = 'opacity: 0';
  weather.style = 'opacity: 0';
  advise.style = 'opacity: 0';
  load.style = 'opacity: 1';
  setTimeout(function () {
    top.style = 'opacity: 1';
    temp.style = 'opacity: 1';
    weather.style = 'opacity: 1';
    advise.style = 'opacity: 1';
    load.style = 'opacity: 0';
  }, 3500);
};

var toCelsius = function toCelsius(tempElem, temp, Feels, feelsElem) {
  tempElem.innerHTML = "".concat(temp, " <span class=\"cel\">C</span>");
  document.body.style.setProperty('--farendisplay', 'none');
  document.body.style.setProperty('--celdisplay', 'initial');
  feelsElem.innerHTML = "".concat(Feels, "<span class=\"togg feels-temp\">C</span>");
};

var toFaren = function toFaren(tempElem, newTemp, like, feelsElem) {
  tempElem.innerHTML = "".concat(newTemp, " <span class=\"faren\">F</span>");
  document.body.style.setProperty('--celdisplay', 'none');
  document.body.style.setProperty('--farendisplay', 'initial');
  feelsElem.innerHTML = "".concat(like, "<span class=\"togg\">F</span>");
};

var showCountry = function showCountry(query, city) {
  var location = selectQuery('.location');
  var quest;
  if (query === 'US') quest = 'USA';
  location.textContent = "".concat(city || 'Unknown', ", ").concat(quest || countries.getName(query, 'en') || ' Location');
};

var renderData = function renderData(data, message) {
  var tempElem = selectQuery('.temp-h1');

  if (!data) {
    tempElem.textContent = message;
    tempElem.style.fontSize = '18px';
  }

  switchLoader();
  var mainData = data.main;
  var feelsLike = mainData.feels_like;
  var temp = mainData.temp;
  var newFeels = feelsLike * 1.8 + 32;
  newFeels = Math.round((newFeels + Number.EPSILON) * 100) / 100;
  var newTemp = temp * 1.8 + 32;
  newTemp = Math.round((newTemp + Number.EPSILON) * 100) / 100;
  var country = data.sys.country;
  var city = data.name;
  var humidity = mainData.humidity;
  var wind = data.wind.speed;
  var switchTemp = document.querySelector('input[type="checkbox"]');
  var feelsElem = selectQuery('.feels-score');

  if (switchTemp.checked) {
    toFaren(tempElem, newTemp, newFeels, feelsElem);
  } else {
    toCelsius(tempElem, temp, feelsLike, feelsElem);
  }

  showCountry(country, city);
  iconSwitch(data.weather[0]);
  selectQuery('.humid-score').textContent = "".concat(humidity, "%");
  selectQuery('.wind-score').textContent = "".concat(wind, "mph");
  switchTemp.addEventListener('change', function (e) {
    if (e.target.checked) {
      toFaren(tempElem, newTemp, newFeels, feelsElem);
    } else {
      toCelsius(tempElem, temp, feelsLike, feelsElem);
    }
  });
  checkWeather(data.weather[0].description);
};

var _default = renderData;
exports["default"] = _default;