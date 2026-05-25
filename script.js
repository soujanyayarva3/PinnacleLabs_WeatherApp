const apiKey =
"52a331bbe2053a9931fe12fe42263a55";

async function getWeather(){

  const city =
  document.getElementById("cityInput")
  .value.trim();

  if(city === ""){

    alert("Please enter city name");

    return;

  }

  /* Loading */

  document.getElementById("cityName")
  .innerText = "Loading...";

  const url =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try{

    const response =
    await fetch(url);

    const data =
    await response.json();

    console.log(data);

    /* Invalid API Key */

    if(data.cod == 401){

      alert("API key not activated yet");

      return;

    }

    /* City Error */

    if(data.cod == 404){

      alert("City not found");

      return;

    }

    /* Update UI */

    document.getElementById("cityName")
    .innerText = data.name;

    document.getElementById("temperature")
    .innerText =
    Math.round(data.main.temp) + "°C";

    document.getElementById("description")
    .innerText =
    data.weather[0].description;

    document.getElementById("humidity")
    .innerText =
    data.main.humidity + "%";

    document.getElementById("wind")
    .innerText =
    data.wind.speed + " km/h";

    /* Weather Icon */

    const icon =
    data.weather[0].icon;

    const weatherIcon =
    document.getElementById("weatherIcon");

    weatherIcon.src =
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

    weatherIcon.style.display =
    "block";

  }

  catch(error){

    alert("Something went wrong");

    console.log(error);

  }

}

/* Enter Key Support */

document.getElementById("cityInput")
.addEventListener("keypress",
function(event){

  if(event.key === "Enter"){

    getWeather();

  }

});