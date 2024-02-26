const apiKey = "68b9b9342555e5ba07176f3590fe84af";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
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
    let data = await response.json();
    console.log(data);

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

        // Get latitude and longitude
        let lon = data.coord.lon;
        let lat = data.coord.lat;

        // Function to fetch additional weather data based on latitude and longitude
        function getWeather(lat, lon) {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,uv_index_max&timezone=auto&timeformat=unixtime&`;
            return fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                  
                    // Get UV index and display on the UI
                    const UVOutput = document.querySelector('.UV');
                   function getUVIndex(uvI) {

                        if (uvI <= 2) {
                            UVOutput.innerHTML = uvI + ' Low risk';
                        } else if (uvI >= 3 && uvI <= 5) {
                            UVOutput.innerHTML = uvI + ' Moderate risk';
                        } else if (uvI >= 6 && uvI <= 7) {
                            UVOutput.innerHTML = uvI + ' High risk';
                        } else if (uvI >= 8 && uvI <= 10) {
                            UVOutput.innerHTML = uvI + ' Very high risk';
                        } else if (uvI >= 11) {
                            UVOutput.innerHTML = uvI + ' Extreme risk';
                        }
                    }
                    getUVIndex(data.daily.uv_index_max[0]);
                    // Get and display forecast data on the UI
                    
                    const forecastDay1 = document.querySelector('.forecastDay1');
                    const forecastDay2 = document.querySelector('.forecastDay2');
                    const forecastDay3 = document.querySelector('.forecastDay3');
                    const forecastDay4 = document.querySelector('.forecastDay4');
                    const forecastDay5 = document.querySelector('.forecastDay5');

                    forecastDay1.innerHTML = data.daily.temperature_2m_min[1] + '&deg;C';
                    console.log(forecastDay1.innerHTML);
                
                    
                })
                .catch(error => console.error('Error fetching weather data:', error));
        }
        getWeather(lat, lon);
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

 //Format and display current date
const formattedDate = `${currentDate} ${currentMonth}`;
document.getElementById('date').innerHTML = formattedDate;






// Add event listener when the DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    // Add event listener to the element with ID "clr"
    document.getElementById("clr").addEventListener("click", clearConsole);
});
function clearConsole() {
    console.clear();
}

