const iconElement = document.querySelector('.weather-icon img');
const locationIcon = document.querySelector('.location-icon img');
const tempElement = document.querySelector('.temprature-value p');
const descElement = document.querySelector('.temprature-description p');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');

var input = document.getElementById('search');

let city = '';
let latitude = 0.0;
let longitude = 0.0;

input.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        city = input.value;
        console.log(city);
        getWeatherByCity(city);
    }
});

const weather = {};
weather.temperature = {
    unit: "celsius"
};

const KELVIN = 273;
const key = 'c0daceea97879db8e6bbda02a63ada28';

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = '<p>Browser doesn\'t support location</p>';
}

function setPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

function showError(error) {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}

locationIcon.addEventListener('click', function(event) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
});

async function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    let response = await fetch(api);
    let data = await response.json();
    console.log(data);
    displayWeather(data);
}

async function getWeatherByCity(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

    let response = await fetch(api);
    let data = await response.json();
    console.log(data);
    displayWeather(data);
}

function displayWeather(data) {
    let temperature = Math.floor(data.main.temp - KELVIN);
    let description = data.weather[0].description;
    let icon = data.weather[0].icon;
    let city = data.name;
    let country = data.sys.country;

    tempElement.innerHTML = `${temperature}°<span>C</span>`;
    descElement.innerHTML = description;
    locationElement.innerHTML = `${city}, ${country}`;
    iconElement.src = `icons/${icon}.png`; // Use the correct URL for the icon
}
