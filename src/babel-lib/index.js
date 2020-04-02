'use strict';

require('../prefixed-style.css');

require('../Normalize.css');

require('../weather-icons.min.css');

var _location = require('./location');

var _location2 = _interopRequireDefault(_location);

var _domInterface = require('./dom-interface');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _location2.default)();
(0, _domInterface.load)();
(0, _domInterface.getInput)();