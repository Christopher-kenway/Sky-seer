const apiKey = "68b9b9342555e5ba07176f3590fe84af";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&units=Metric&appid=${apiKey}`;
console.log(apiUrl);

const city = document.getElementById("locationInput").value;


async function checkWeather(){
    const response = await fetch(apiUrl);
    let data = await response.json();
    console.log(data);
}

checkWeather();