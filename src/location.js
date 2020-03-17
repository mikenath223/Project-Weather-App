import animeSearch from './dom-interface';
import { makeRequest, googleMaps } from './handler';

const showPosition = position => {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  makeRequest(`${lat} ${long}`, 'location', true);
};

const showError = error => {
  if (error.PERMISSION_DENIED) {
    animeSearch();
    googleMaps(37, -95);
  }
};

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
};

export default getLocation;
