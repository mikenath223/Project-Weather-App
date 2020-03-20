"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInput = exports.load = exports.animeSearch = void 0;

var _handler = require("./handler");

var selectQuery = function selectQuery(query) {
  return document.querySelector(query);
};

var getInput = function getInput() {
  var searchIcon = selectQuery('.icon-wrap');
  var input = selectQuery('.search');
  searchIcon.addEventListener('click', function () {
    var query = input.value;
    var len = query.length;

    if (len > 3 && len <= 15) {
      (0, _handler.makeRequest)(query, ' ', 'addpoint');
    }

    input.value = '';
    return '';
  });

  input.onclick = function () {
    return searchIcon.classList.remove('vibrate');
  };

  window.addEventListener('keypress', function (e) {
    if (e.key === searchIcon.dataset.key) {
      var query = input.value;
      var len = query.length;

      if (len > 3 && len <= 15) {
        (0, _handler.makeRequest)(query, ' ', 'addpoint');
      }

      input.value = '';
    }

    return '';
  });
  return '';
};

exports.getInput = getInput;

var animeSearch = function animeSearch() {
  var searchIcon = selectQuery('.icon-wrap');
  searchIcon.classList.add('vibrate');
};

exports.animeSearch = animeSearch;

var load = function load() {
  var date = selectQuery('.date');
  var currentDate = new Date().toString().slice(0, 33).replace(/\s/, ', ');
  var time = currentDate.slice(17, 25).split(':');
  var hour = time[0];
  hour > 12 ? time = "".concat(hour - 12, ":").concat(time[1], ":").concat(time[2], "PM") : time = "".concat(time.join(':'), "AM");
  date.innerHTML = currentDate.replace(/\d+:\d+:\d+/, time);
};

exports.load = load;