"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeRequest = exports.googleMaps = void 0;

var _loadData = _interopRequireDefault(require("./load-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var newMap;
var mapObj;

var loadGoogleMapApi = require('load-google-maps-api');

var selectQuery = function selectQuery(query) {
  return document.querySelector(query);
};

var makeRequest = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(query, check, fromMap) {
    var strQuery, response, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = check;
            _context.next = _context.t0 === 'location' ? 3 : 6;
            break;

          case 3:
            query = query.split(' ');
            strQuery = "https://api.openweathermap.org/data/2.5/weather?lat=".concat(query[0], "&lon=").concat(query[1], "&units=metric&APPID=3227974f4ec9644ec0f1cae6e61af58b");
            return _context.abrupt("break", 8);

          case 6:
            strQuery = "https://api.openweathermap.org/data/2.5/weather?q=".concat(query, "&units=metric&APPID=3227974f4ec9644ec0f1cae6e61af58b");
            return _context.abrupt("break", 8);

          case 8:
            if (strQuery) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return");

          case 10:
            _context.prev = 10;
            _context.next = 13;
            return fetch(strQuery, {
              mode: 'cors'
            });

          case 13:
            response = _context.sent;
            _context.next = 16;
            return response.json();

          case 16:
            data = _context.sent;

            if (data) {
              _context.next = 19;
              break;
            }

            return _context.abrupt("return");

          case 19:
            (0, _loadData["default"])(data);

            if (fromMap === 'addpoint' && mapObj !== undefined) {
              new mapObj.Marker({
                position: {
                  lat: +data.coord.lat,
                  lng: +data.coord.lon
                },
                map: newMap
              });
              newMap.panTo({
                lat: data.coord.lat,
                lng: data.coord.lon
              });
            }

            selectQuery('.map-info>p').textContent = 'Click any location on the map to display weather info';
            _context.next = 27;
            break;

          case 24:
            _context.prev = 24;
            _context.t1 = _context["catch"](10);

            if (_context.t1) {
              selectQuery('.map-info>p').textContent = 'Sorry. There was an error getting your result';
            }

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[10, 24]]);
  }));

  return function makeRequest(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.makeRequest = makeRequest;

var googleMaps = function googleMaps(lat, _long, request) {
  var mapElem = selectQuery('#map');
  loadGoogleMapApi({
    key: 'AIzaSyCw8KDvLHXpm6XHDleb6hL5_yesNo2Ab9U'
  }).then(function (map) {
    mapObj = map;
    var mapCreated = new map.Map(mapElem, {
      center: {
        lat: lat,
        lng: _long
      },
      zoom: 7
    });

    var markMap = function markMap(pos) {
      new map.Marker({
        position: pos,
        map: mapCreated
      });
    };

    markMap({
      lat: lat,
      lng: _long
    });
    newMap = mapCreated;
    mapCreated.addListener('click', function (e) {
      markMap(e.latLng);
      makeRequest("".concat(e.latLng.lat(), " ").concat(e.latLng.lng()), 'location', '');
      mapCreated.panTo(e.latLng);
    });
  });
  if (request === true) makeRequest("".concat(lat, " ").concat(_long), 'location', 'addpoint');
};

exports.googleMaps = googleMaps;