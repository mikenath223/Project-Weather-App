import { switchLoader, timezone } from "./load-data";

let newMap;
let mapObj;

const loadGoogleMapApi = require("load-google-maps-api");

const selectQuery = query => document.querySelector(query);
const makeRequest = async (query, check, fromMap) => {
  let strQuery;

  switch (check) {
    case "location":
      query = query.split(" ");
      strQuery = `https://api.openweathermap.org/data/2.5/weather?lat=${query[0]}&lon=${query[1]}&units=metric&APPID=${process.env.OPEN_WEATHER_API_KEY}`;
      break;
    default:
      strQuery = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${process.env.OPEN_WEATHER_API_KEY}`;
      break;
  }
  if (!strQuery) return;
  const warnElems = document.querySelectorAll(".logo");

  try {
    const response = await fetch(strQuery, {
      mode: "cors"
    });
    response
      .json()
      .then(data => {
        if (!data) return;
        switchLoader(data);
        timezone(Number(+data.coord.lat.toFixed(2)), Number(+data.coord.lon.toFixed(2)));
        warnElems.forEach(elem => (elem.textContent = "weatherGuard"));
        if (fromMap === "addpoint" && mapObj !== undefined) {
          new mapObj.Marker({
            position: { lat: +data.coord.lat, lng: +data.coord.lon },
            map: newMap
          });
          newMap.panTo({ lat: data.coord.lat, lng: data.coord.lon });
        }
      })
      .catch(() => {
        warnElems.forEach(elem => (elem.textContent = "Incorrect Input.💢"));
      });

  } catch (error) {
  }
};

const googleMaps = (lat, long, request) => {
  const mapElem = selectQuery("#map");
  loadGoogleMapApi({ key: `${process.env.GOOGLE_MAP_API_KEY}` }).then(map => {
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
    };
    markMap({ lat, lng: long });
    newMap = mapCreated;
    mapCreated.addListener("click", e => {
      markMap(e.latLng);

      makeRequest(`${e.latLng.lat()} ${e.latLng.lng()}`, "location", "");
      mapCreated.panTo(e.latLng);
    });
  });
  if (request === true) makeRequest(`${lat} ${long}`, "location", "addpoint");
};

export { googleMaps, makeRequest };
