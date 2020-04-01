'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInput = exports.load = exports.animeSearch = undefined;

var _handler = require('./handler');

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

var animeSearch = function animeSearch() {
  var searchIcon = selectQuery('.icon-wrap');
  searchIcon.classList.add('vibrate');
};

var load = function load() {
  var date = selectQuery('.date');
  var currentDate = new Date().toString().slice(0, 33).replace(/\s/, ', ');
  var time = currentDate.slice(17, 25).split(':');
  var hour = time[0];
  if (String(hour) == '00') hour = 12;
  hour > 12 ? time = hour - 12 + ':' + time[1] + ':' + time[2] + 'PM' : time = hour + ':' + time[1] + 'AM';
  date.innerHTML = currentDate.replace(/\d+:\d+:\d+/, time);
};

exports.animeSearch = animeSearch;
exports.load = load;
exports.getInput = getInput;