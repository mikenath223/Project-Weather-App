import { animeSearch, selectQuery } from "./dom-interface";
import makeRequest from "./handler";

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
};

const showPosition = position => {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  // makeRequest(`${lat} ${long}`, "location");
  // let img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false&key=YOUR_KEY";
  console.log(process.env.GOOGLE_MAP_API_KEY);
  
  // document.getElementById("mapholder").innerHTML =
  //   "<img src='" + img_url + "'>";
  const mapElem = selectQuery("#map");
  const loadGoogleMapApi = require("load-google-maps-api");
  loadGoogleMapApi({ key: process.env.GOOGLE_MAP_API_KEY }).then(map => {
    new map.Map(mapElem, {
      center: { lat: lat, lng: long },
      zoom: 14
    });
  });

  return;
};

const showError = error => {
  if (error.PERMISSION_DENIED) {
    animeSearch();
  }
};

export default getLocation;
