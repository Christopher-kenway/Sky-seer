// API and DOM Element Selections
const apiKey = "68b9b9342555e5ba07176f3590fe84af";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
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

// Default city input
let cityInput = '';

// Form submission event
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (locationInputField.value.trim() === '') {
        alert('Please enter a city');
    } else {
       cityInput = locationInputField.value;
        fetchWeatherData(); // Invoke function to fetch weather data using cityInput
        locationInputField.value = ''; // Clear the input field
    }
});

// Function to fetch weather data
function fetchWeatherData() {
    fetch(`${apiUrl}${cityInput}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
        // Update UI with fetched weather data
        tempOutput.innerHTML = Math.round(data.main.temp) + '&deg;C';
        city.innerHTML = data.name;
        conditionOutput.innerHTML = data.weather[0].description;
        humidityOutput.innerHTML = data.main.humidity + '%';
        PressureOutput.innerHTML = data.main.pressure + ' hPa';
        windOutput.innerHTML = data.wind.speed + ' km/h';
        feelsLikeOutput.innerHTML = Math.round(data.main.feels_like) + '&deg;C';

        // Change weather icon based on conditions
        const iconCondition = data.weather[0].main.toLowerCase();
        // (Add conditions to change icon image source)

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

        // Get latitude and longitude
        let lon = data.coord.lon;
        let lat = data.coord.lat;

        // Function to fetch additional weather data based on latitude and longitude
        function getWeather(lat, lon) {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,uv_index_max&timezone=auto&timeformat=unixtime&`;
            return fetch(url)
                .then(response => response.json())
                .then(data => {
                    // Process additional weather data and update UI
                    const uvI = data.daily.uv_index_max[0];
                    // (Process and update UV data)
                    const forecastDay1 = data.daily.temperature_2m_min[1];
                    const forecastDay2 = data.daily.temperature_2m_min[2];
                    const forecastDay3 = data.daily.temperature_2m_min[3];
                    const forecastDay4 = data.daily.temperature_2m_min[4];
                    const forecastDay5 = data.daily.temperature_2m_min[5];
                    // (Update forecast data on the UI)
                })
                .catch(error => console.error('Error fetching weather data:', error));
        }
    });
}

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
const formattedDate = `${day[currentDay]}, ${currentDate} ${currentMonth} ${currentYear}`;
document.getElementById('date').innerHTML = formattedDate;
