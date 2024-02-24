const apiKey = "68b9b9342555e5ba07176f3590fe84af";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&units=Metric&appid=${apiKey}`;


const form = document.getElementById("locationInput").value;


async function checkWeather(){
    const response = await fetch(apiUrl);
    let data = await response.json();
    console.log(data);
}
checkWeather();

//Form Submit event
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

// fetch weather data
function fetchWeatherData(){
    fetch(apiUrl) 
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(err => console.log(err));

}