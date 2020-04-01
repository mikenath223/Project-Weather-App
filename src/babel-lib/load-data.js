'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _umbrella = require('../assets/umbrella.png');

var _umbrella2 = _interopRequireDefault(_umbrella);

var _fun = require('../assets/fun.png');

var _fun2 = _interopRequireDefault(_fun);

var _wall = require('../assets/wall1.jpg');

var _wall2 = _interopRequireDefault(_wall);

var _wall3 = require('../assets/wall2.jpg');

var _wall4 = _interopRequireDefault(_wall3);

var _scenic = require('../assets/scenic.jpg');

var _scenic2 = _interopRequireDefault(_scenic);

var _thunderstorm = require('../assets/thunderstorm.jpg');

var _thunderstorm2 = _interopRequireDefault(_thunderstorm);

var _wall1Mobile = require('../assets/wall1-mobile.jpg');

var _wall1Mobile2 = _interopRequireDefault(_wall1Mobile);

var _sunnyMobile = require('../assets/sunny-mobile.jpg');

var _sunnyMobile2 = _interopRequireDefault(_sunnyMobile);

var _scenicMobile = require('../assets/scenic-mobile.jpg');

var _scenicMobile2 = _interopRequireDefault(_scenicMobile);

var _thunderstormMobile = require('../assets/thunderstorm-mobile.jpg');

var _thunderstormMobile2 = _interopRequireDefault(_thunderstormMobile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectQuery = function selectQuery(query) {
  return document.querySelector(query);
};
var countries = require('i18n-iso-countries');
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

var iconSwitch = function iconSwitch(weather) {
  var icon = selectQuery('.wi');
  var weatherDesc = selectQuery('.weather-desc');
  icon.classList = 'wi wi-owm-' + weather.id;
  weatherDesc.textContent = weather.description;
};

var checkWeather = function checkWeather(data) {
  var weatherIcon = selectQuery('.umbrella');
  var advise = selectQuery('.advise>p');
  var container = selectQuery('.container');
  if (!/cloud|rain|storm/.test(data)) {
    weatherIcon.src = _fun2.default;
    advise.textContent = 'Go have fun.';
    if (window.matchMedia("(max-width: 769px)")) {
      container.setAttribute('style', 'background-image: url(' + _sunnyMobile2.default + ')');
    } else {
      container.setAttribute('style', 'background-image: url(' + _wall4.default + ')');
    }
  } else if (/clear/.test(data)) {

    if (window.matchMedia("(max-width: 769px)")) {} else {
      container.setAttribute('style', 'background-image: url(' + _scenicMobile2.default + ')');
    }
  } else if (/storm/.test(data)) {

    if (window.matchMedia("(max-width: 769px)")) {
      container.setAttribute('style', 'background-image: url(' + _wall1Mobile2.default + ')');
    } else {
      container.setAttribute('style', 'background-image: url(' + _wall2.default + ')');
    }
    weatherIcon.src = _umbrella2.default;
    advise.textContent = 'You might get wet out there.';
  } else {

    if (window.matchMedia("(max-width: 769px)")) {
      container.setAttribute('style', 'background-image: url(' + _thunderstormMobile2.default + ')');
    } else {
      container.setAttribute('style', 'background-image: url(' + _thunderstorm2.default + ')');
    }
    weatherIcon.src = _umbrella2.default;
    advise.textContent = 'You might get wet out there.';
  }
};

var toCelsius = function toCelsius(tempElem, temp, Feels, feelsElem) {
  tempElem.innerHTML = temp + ' <span class="cel">C</span>';
  document.body.style.setProperty('--farendisplay', 'none');
  document.body.style.setProperty('--celdisplay', 'initial');
  feelsElem.innerHTML = Feels + '<span class="togg feels-temp">C</span>';
};

var toFaren = function toFaren(tempElem, newTemp, like, feelsElem) {
  tempElem.innerHTML = newTemp + ' <span class="faren">F</span>';
  document.body.style.setProperty('--celdisplay', 'none');
  document.body.style.setProperty('--farendisplay', 'initial');
  feelsElem.innerHTML = like + '<span class="togg">F</span>';
};

var showCountry = function showCountry(query, city) {
  var location = selectQuery('.location');
  var quest = void 0;
  if (query === 'US') quest = 'USA';
  location.textContent = (city || 'Unknown') + ', ' + (quest || countries.getName(query, 'en') || ' Location');
};

var renderData = function renderData(data, message) {
  var tempElem = selectQuery('.temp-h1');
  if (!data) {
    tempElem.textContent = message;
    tempElem.style.fontSize = '18px';
  }

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
  selectQuery('.humid-score').textContent = humidity + '%';
  selectQuery('.wind-score').textContent = wind + 'mph';

  switchTemp.addEventListener('change', function (e) {
    if (e.target.checked) {
      toFaren(tempElem, newTemp, newFeels, feelsElem);
    } else {
      toCelsius(tempElem, temp, feelsLike, feelsElem);
    }
  });
  checkWeather(data.weather[0].description);
};

var switchLoader = function switchLoader(data) {
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
    renderData(data);
  }, 3500);
};

exports.default = switchLoader;