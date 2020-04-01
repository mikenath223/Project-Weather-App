"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeRequest = exports.googleMaps = undefined;

var _loadData = require("./load-data");

var _loadData2 = _interopRequireDefault(_loadData);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var newMap = void 0;
var mapObj = void 0;

var loadGoogleMapApi = require("load-google-maps-api");

var selectQuery = function selectQuery(query) {
  return document.querySelector(query);
};
var makeRequest = async function makeRequest(query, check, fromMap) {
  var strQuery = void 0;

  switch (check) {
    case "location":
      query = query.split(" ");
      strQuery = "https://api.openweathermap.org/data/2.5/weather?lat=" + query[0] + "&lon=" + query[1] + "&units=metric&APPID=" + process.env.OPEN_WEATHER_API_KEY;
      break;
    default:
      strQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&APPID=" + process.env.OPEN_WEATHER_API_KEY;
      break;
  }
  if (!strQuery) return;
  var warnElems = document.querySelectorAll(".logo");

  try {
    var response = await fetch(strQuery, {
      mode: "cors"
    });
    response.json().then(function (data) {
      if (!data) return;
      (0, _loadData2.default)(data);
      warnElems.forEach(function (elem) {
        return elem.textContent = "weatherGuard";
      });
      if (fromMap === "addpoint" && mapObj !== undefined) {
        new mapObj.Marker({
          position: { lat: +data.coord.lat, lng: +data.coord.lon },
          map: newMap
        });
        newMap.panTo({ lat: data.coord.lat, lng: data.coord.lon });
      }
    }).catch(function () {
      warnElems.forEach(function (elem) {
        return elem.textContent = "Incorrect Input.💢";
      });
    });
  } catch (error) {}
};

var googleMaps = function googleMaps(lat, long, request) {
  var mapElem = selectQuery("#map");
  loadGoogleMapApi({ key: "" + process.env.GOOGLE_MAP_API_KEY }).then(function (map) {
    mapObj = map;
    var mapCreated = new map.Map(mapElem, {
      center: { lat: lat, lng: long },
      zoom: 7
    });
    var markMap = function markMap(pos) {
      new map.Marker({
        position: pos,
        map: mapCreated
      });
    };
    markMap({ lat: lat, lng: long });
    newMap = mapCreated;
    mapCreated.addListener("click", function (e) {
      markMap(e.latLng);

      makeRequest(e.latLng.lat() + " " + e.latLng.lng(), "location", "");
      mapCreated.panTo(e.latLng);
    });
  });
  if (request === true) makeRequest(lat + " " + long, "location", "addpoint");
};

exports.googleMaps = googleMaps;
exports.makeRequest = makeRequest;