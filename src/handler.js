import { renderData } from './dom-interface';

let newMap, mapObj;

const makeRequest = async (query, check, mapPin) => {
  const key = process.env.OPEN_WEATHER_API_KEY;
  let strQuery;

  switch (check) {
    case 'location':
      query = query.split(' ');
      strQuery = `http://api.openweathermap.org/data/2.5/weather?lat=${query[0]}&lon=${query[1]}&units=metric&APPID=${key}`;
      break;
    default:
      strQuery = `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${key}`;
      break;
  }
  if (!strQuery) return;

  try {
    const response = await fetch(strQuery, {
      mode: 'cors',
    });
    const data = await response.json();
    renderData(data);
    if (mapPin === true) {
      console.log('touched');
      googleMaps(data.coord.lat, data.coord.lon);
      // pinPlacer({lat: data.coord.lat, lng: data.coord.lon}, newMap)
    } else {
      console.log('works');
      new mapObj.Marker({
        position: {lat: data.coord.lat, lng: data.coord.lon},
        map: newMap
      });
    newMap.panTo({lat: data.coord.lat, lng: data.coord.lon});
    }

  } catch (error) {
    renderData(false, error.message);
  }
};

const loadGoogleMapApi = require("load-google-maps-api");
const selectQuery = query => document.querySelector(query);

const googleMaps = (lat, long) => {
  const mapElem = selectQuery("#map");
  loadGoogleMapApi({ key: process.env.GOOGLE_MAP_API_KEY }).then(map => {
    mapObj = map;
    const mapCreated = new map.Map(mapElem, {
      center: { lat, lng: long },
      zoom: 7
    });
    const markMap = pos => {
      new map.Marker({
        position: pos,
        map: mapCreated
      });
    }
    markMap({lat: lat, lng: long})
    newMap = mapCreated;
    mapCreated.addListener("click", e => {
      console.log(newMap);
      markMap(e.latLng);
      makeRequest(`${e.latLng.lat()} ${e.latLng.lng()}`, "location");
      mapCreated.panTo(e.latLng);
    });
  });
};


export { makeRequest, googleMaps };