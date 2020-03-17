import animeSearch from './dom-interface';
import makeRequest from './handler';

const loadGoogleMapApi = require('load-google-maps-api');

const selectQuery = query => document.querySelector(query);
const showPosition = position => {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  makeRequest(`${lat} ${long}`, 'location', 'metric');
};

const googleMaps = (lat, long) => {
  const mapElem = selectQuery('#map');
  loadGoogleMapApi({ key: process.env.GOOGLE_MAP_API_KEY }).then(map => {
    const mapCreated = new map.Map(mapElem, {
      center: { lat, lng: long },
      zoom: 7,
    });
    mapCreated.addListener('click', (e) => {
      new map.Marker({
        position: e.latLng,
        map: mapCreated,
      });
      mapCreated.panTo(e.latLng);
      makeRequest(`${e.latLng.lat()} ${e.latLng.lng()}`, 'location');
    });
  });
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

export { getLocation, googleMaps };
