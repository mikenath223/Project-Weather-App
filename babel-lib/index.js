"use strict";

require("../src/style.css");

require("../src/Normalize.css");

require("../src/weather-icons.min.css");

var _location = _interopRequireDefault(require("./location"));

var _domInterface = require("./dom-interface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _location["default"])();
(0, _domInterface.load)();
(0, _domInterface.getInput)();