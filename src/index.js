import './style.css';
import './Normalize.css';
import './weather-icons.min.css';
import getLocation from "./location";
import makeRequest from './handler';
import { load, getInput, showCountry } from "./dom-interface";

getLocation();
load();
getInput();
showCountry();
// makeRequest('Abuja');