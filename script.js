const apiKey = "68b9b9342555e5ba07176f3590fe84af";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=london&cnt=6&units=Metric&appid=${apiKey}`;
const app = document.querySelector('.weather-app');
const timeOutput = document.querySelector('.time');
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
const city = document.querySelector('.city');


// Form Submit event
let cityInput = '';

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevents the page from refreshing

    if (locationInputField.value.trim() === '') {
        alert('Please enter a city name');
    } else {
        cityInput = locationInputField.value;
      fetchWeatherData(); // Fetch weather data
      locationInputField.value = ''; // Clear input field
    }
})




// fetch weather data


async function fetchWeatherData()
{
    const response = await fetch(apiUrl + cityInput + `&appid=${apiKey}`);
    const forecastResponse = await fetch(forecastUrl);
    let data = await response.json();
    let forecastData = await forecastResponse.json();
    console.log(data);
    console.log(forecastData);

    // Display weather data
    city.innerHTML = data.name;
    tempOutput.innerHTML = Math.round(data.main.temp) + '&deg;C';
    conditionOutput.innerHTML = data.weather[0].description;
    humidityOutput.innerHTML = data.main.humidity + '%';
    PressureOutput.innerHTML = data.main.pressure + ' hPa';
    windOutput.innerHTML = data.wind.speed + ' km/h';
    feelsLikeOutput.innerHTML = Math.round(data.main.feels_like) + '&deg;C';

    // Function to convert Unix timestamp to formatted time
    function convertUnixTimestampToTime(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000);
        let hours = date.getHours();
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const formattedTime = `${('0' + hours).slice(-2)}:${minutes} ${period}`;
        return formattedTime;
    }

    // Get sunrise and sunset timestamps and display formatted time
    const sunriseTimestamp = data.sys.sunrise;
    const sunsetTimestamp = data.sys.sunset;
    let formattedSunriseTime = convertUnixTimestampToTime(sunriseTimestamp);
    let formattedSunsetTime = convertUnixTimestampToTime(sunsetTimestamp);
    sunriseOutput.innerHTML = formattedSunriseTime;
    sunsetOutput.innerHTML = formattedSunsetTime;

    

}

fetchWeatherData();

// Array for days and months
const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

// Get current date details
const date = new Date();
const currentDay = date.getDay();
const currentDate = date.getDate();
const currentMonthIndex = date.getMonth();
const currentYear = date.getFullYear();

// Get current month name from the array
const currentMonth = month[currentMonthIndex];

 // Format and display current date
// const formattedDate = `${day[currentDay]}, ${currentDate} ${currentMonth} `;
// document.getElementById('date').innerHTML = formattedDate;




