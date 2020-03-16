import activateAnime from "./dom-interface";

let location;

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
};

const showPosition = position => {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  location = `${lat} ${long}`;
  return;
};

const showError = error => {
  if (error.PERMISSION_DENIED) {
    activateAnime();
  }
};

export { getLocation, location };
