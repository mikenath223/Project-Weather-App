import { selectQuery } from "./dom-interface"


const iconSwitch = (weather) => {
  let icon = selectQuery('.wi')
  let weatherDesc = selectQuery('.weather-desc');
  icon.classList = `wi wi-owm-${weather.id}`;
  weatherDesc.textContent = weather.description;
}

const checkWeather = (data) => {
  let weatherIcon = selectQuery('.umbrella');
  let advise = selectQuery('.advise>p');
  if (!/cloud/.test(data)) {
    weatherIcon.src = '../src/assets/fun.png';
    advise.textContent = "Go have fun."
  }
}

export { iconSwitch, checkWeather };