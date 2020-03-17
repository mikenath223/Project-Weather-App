import { renderData } from "./dom-interface";

const makeRequest = async (query, check) => {
  const key = process.env.OPEN_WEATHER_API_KEY;
  let strQuery;

  switch (check) {
    case "location":
      query = query.split(" ");
      strQuery = `http://api.openweathermap.org/data/2.5/weather?lat=${query[0]}&lon=${query[1]}&units=metric&APPID=${key}`;
      break;
    default:
      strQuery = `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${key}`;
      break;
  }
  console.log(strQuery);
  if (!strQuery) return;
    
  try {
    const response = await fetch(strQuery, {
      mode: "cors"
    });
    const data = await response.json();
    console.log(data);
    renderData(data);
  } catch (error) {
    // renderData('null', error.message);
    console.log(error);
  }
};

export default makeRequest;

// /cloud/gi
// /snow/gi
// /rain/gi
