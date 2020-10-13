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

// FEATURE 2
// Add a search engine, when searching for a city (i.e. Paris),
// display the city name on the page after the user submits the form.

// BONUS FEATURE
// Display a fake temperature (i.e 17) in Celsius and add a
// link to convert it to Fahrenheit. When clicking on it, it
// should convert the temperature to Fahrenheit.
// When clicking on Celsius, it should convert it back to Celsius.

function convertCelsius(event) {
  event.preventDefault();
  let tempCelsius = document.querySelector("#temp-now");

  tempCelsius.innerHTML = `19`;
}

function convertFahrenheit(event) {
  event.preventDefault();
  let tempFahrenheit = document.querySelector("#temp-now");

  tempFahrenheit.innerHTML = `66`;
}

let celsiusTemp = document.querySelector("#celsius-link");
celsiusTemp.addEventListener("click", convertCelsius);

let fahrenheitTemp = document.querySelector("#fahrenheit-link");
fahrenheitTemp.addEventListener("click", convertFahrenheit);

// WEEK 5 HOMEWORK
// https://api.openweathermap.org/data/2.5/weather?q=paris&appid=33b8b562348753ed5be1de7a4e815fb7

function showTemperature(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temp-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temp-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity-now").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind-now").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "33b8b562348753ed5be1de7a4e815fb7";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "imperial";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let cityForm = document.querySelector("#city-search-form");
cityForm.addEventListener("submit", handleSubmit);

let searchButton = document.querySelector("#submit-button");
searchButton.addEventListener("click", handleSubmit);

// WEEK 5 Homework - BONUS
// add Current button and insert geolocation API

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

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
