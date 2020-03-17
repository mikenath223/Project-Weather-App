import animeSearch from "./dom-interface";
import { makeRequest, googleMaps } from "./handler";

// const pinPlacer = (coords,map) => {
//   // var myLatLng = {lat: -25.363, lng: 131.044};
  
//   new map.Marker({
//     position: coords,
//     map: map
//   });
// };

const showPosition = position => {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  makeRequest(`${lat} ${long}`, "location", true);
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
