const apiKey = "68b9b9342555e5ba07176f3590fe84af";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Nigeria&units=Metric&appid=${apiKey}`;
const location = document.getElementById("locationInput").value;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=london&cnt=6&units=Metric&appid=${apiKey}`;
const app = document.querySelector('.weather-app');
const timeOutput = document.querySelector('.time');
const city = document.querySelector('.city');
const conditionOutput = document.querySelector('.condition');
const icon = document.querySelector('.icon');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const temperatureOutput = document.querySelector('.temperature');
const tempOutput = document.querySelector('.temp');
const form = document.getElementById('locationInput'); 
const locationInputField = form.querySelector('input[type="text"]'); 
const PressureOutput = document.querySelector('.Pressure');
const feelsLikeOutput = document.querySelector('.feelslike');
const UVOutput = document.querySelector('.UV');
const sunriseOutput = document.querySelector('.sunrise');
const sunsetOutput = document.querySelector('.sunset');
const iconCondition = document.querySelector('.icon');




// fetch weather data


async function checkWeather()
{
    const response = await fetch(apiUrl);
    const forecastResponse = await fetch(forecastUrl);
    let data = await response.json();
    let forecastData = await forecastResponse.json();
    console.log(data);
    console.log(forecastData);

    // Display weather data
    city.innerHTML = data.name;
    tempOutput.innerHTML = Math.round(data.main.temp) + '&deg;C';
    city.innerHTML = data.name;
    conditionOutput.innerHTML = data.weather[0].description;
    humidityOutput.innerHTML = data.main.humidity + '%';
    PressureOutput.innerHTML = data.main.pressure + ' hPa';
    windOutput.innerHTML = data.wind.speed + ' km/h';
    feelsLikeOutput.innerHTML = Math.round(data.main.feels_like) + '&deg;C';

}
checkWeather();

//Form Submit event
// let cityInput = '';

// document.getElementById('weatherForm').addEventListener('submit', function(e){
//     e.preventDefault();
//     cityInput = document.getElementById('locationInput').value;
//     console.log(cityInput);
//     getWeather();
// });


// // fetch weather data
// function getWeather(){
    
//     if (location === ""){
//         alert("Please enter a city!")
//         return;
//     } else {
//         fetch(apiUrl)
//         .then((response) => response.json())
//         .then((data) => {
//             displayWeather(data);
//             console.log(data);
            
//         });
//     }
// }

// getWeather();