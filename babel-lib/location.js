"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _domInterface = require("./dom-interface");

var _handler = require("./handler");

var showPosition = function showPosition(position) {
  var lat = position.coords.latitude;
  var _long = position.coords.longitude;
  (0, _handler.googleMaps)(lat, _long, true);
};

var showError = function showError(error) {
  if (error.PERMISSION_DENIED) {
    (0, _domInterface.animeSearch)();
    (0, _handler.googleMaps)(37, -95, true);
  }
};

var getLocation = function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
};

var _default = getLocation;
exports["default"] = _default;