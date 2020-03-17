import './style.css';
import './Normalize.css';
import './weather-icons.min.css';
import getLocation from './location';
import { load, getInput } from './dom-interface';


getLocation();
load();
getInput();