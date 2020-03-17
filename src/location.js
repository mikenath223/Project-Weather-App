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
  makeRequest(`${lat} ${long}`, "location", 'metric');

  return;
};

const showError = error => {
  if (error.PERMISSION_DENIED) {
    animeSearch();
    googleMaps(37, -95)
  }
};

const googleMaps = (lat, long) => {
  const mapElem = selectQuery("#map");
  const loadGoogleMapApi = require("load-google-maps-api");
  loadGoogleMapApi({ key: process.env.GOOGLE_MAP_API_KEY }).then(map => {
    let mapCreated = new map.Map(mapElem, {
      center: { lat: lat, lng: long },
      zoom: 7
    });
    mapCreated.addListener("click", function(e) {
      console.log(e.latLng.lat());
      new map.Marker({
        position: e.latLng,
        map: mapCreated
      });
      mapCreated.panTo(e.latLng);
      makeRequest(`${e.latLng.lat()} ${e.latLng.lng()}`, "location");
    });
  });
};

export { getLocation, googleMaps };
