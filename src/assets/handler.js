const makeRequest = async query => {
  const dummy = "null3227974f4ec9644ec0f1cae6e61af58bnull";

  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${dummy.slice(4, -4)}`,
      {
        mode: "cors"
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('Input not correct');    
  }
};

export default makeRequest;

/cloud/gi
/snow/gi
/rain/gi


let currentDate = new Date()
currentDate.toLocaleString(undefined, {
  hour: '2-digit',
  minute: '2-digit',
  weekday: 'short',
  month: 'long',
  day: 'numeric',
  year: 'numeric'
  })