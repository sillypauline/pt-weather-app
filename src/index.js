// FEATURE 1
// In your project, display the current date
// and time using JavaScript: Tuesday 16:00

function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}

// WEEK 5 HOMEWORK
// https://api.openweathermap.org/data/2.5/weather?q=paris&appid=33b8b562348753ed5be1de7a4e815fb7

function showTemperature(response) {
  let cityElement = document.querySelector("#city-name");
  let temperatureElement = document.querySelector("#temp-now");
  let tempFeelElement = document.querySelector("#temp-feel");
  let humidityElement = document.querySelector("#humidity-now");
  let windElement = document.querySelector("#wind-now");
  let descriptionElement = document.querySelector("#today-description");
  let dateElement = document.querySelector("#day-time");
  let iconElement = document.querySelector("#icon-today");

  fahrenheitTemperature = response.data.main.temp;
  fahrenheitFeel = response.data.main.feels_like;
  windSpeed = response.data.wind.speed;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  tempFeelElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].main;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// FORECAST API
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];

    forecastElement.innerHTML += `
      <div class="col-2">
        <h3>
          ${formatHours(forecast.dt * 1000)}
        </h3>
        <img
          src="https://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png"
        />
        <div class="weather-forecast-temperature">
          <span class="forecast-max">
            <strong>
            ${Math.round(forecast.main.temp_max)}°
            </strong> 
          </span>
          <span class="forecast-min">
          ${Math.round(forecast.main.temp_min)}°
          </span>
        </div>
    </div>
    `;
  }
}

function searchCity(city) {
  let apiKey = "33b8b562348753ed5be1de7a4e815fb7";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/";
  let units = "imperial";
  let apiUrl = `${apiEndpoint}weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);

  apiUrl = `${apiEndpoint}forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "33b8b562348753ed5be1de7a4e815fb7";
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/";
  let apiUrl = `${apiEndpoint}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);

  apiUrl = `${apiEndpoint}forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-now");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature = (fahrenheitTemperature - 32) * (5 / 9);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let tempFeelElement = document.querySelector("#temp-feel");
  let celsiusFeel = (fahrenheitFeel - 32) * (5 / 9);
  tempFeelElement.innerHTML = Math.round(celsiusFeel);
  let tempFeelUnit = document.querySelector("#temp-feel-unit");
  tempFeelUnit.innerHTML = `°C`;

  let windElement = document.querySelector("#wind-now");
  let windUnitElement = document.querySelector("#wind-unit");
  windElement.innerHTML = Math.round(windSpeed * 1.609);
  windUnitElement.innerHTML = ` km/h`;
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp-now");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  let tempFeelElement = document.querySelector("#temp-feel");
  tempFeelElement.innerHTML = Math.round(fahrenheitFeel);
  let tempFeelUnit = document.querySelector("#temp-feel-unit");
  tempFeelUnit.innerHTML = `°F`;

  let windElement = document.querySelector("#wind-now");
  windElement.innerHTML = Math.round(windSpeed);
  let windUnitElement = document.querySelector("#wind-unit");
  windUnitElement.innerHTML = ` mph`;
}

searchCity("New York");

let fahrenheitTemperature = null;
let fahrenheitFeel = null;
let windSpeed = null;

let cityForm = document.querySelector("#city-search-form");
cityForm.addEventListener("submit", handleSubmit);

let searchButton = document.querySelector("#submit-button");
searchButton.addEventListener("click", handleSubmit);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);
