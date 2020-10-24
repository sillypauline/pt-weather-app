// FEATURE 1
// In your project, display the current date
// and time using JavaScript: Tuesday 16:00
let now = new Date();

function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes();

  let formatDate = `${day}, ${hour}:${minute}`;

  return formatDate;
}

let timeNow = document.querySelector("#day-time");
timeNow.innerHTML = formatDate(now);

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

function displayForecast(response) {
  console.log(response.data);
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
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
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
