// date and time/
let days =[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let allDay = document.getElementById("day");
let Alldate = document.getElementById("date");
let time = document.getElementById("clock");

setInterval(function(){
    let now = new Date();
    let todaydate = String(now.getDate()).padStart(2,"0");
    let month = months[now.getMonth()];
    let year = String(now.getFullYear());
    Alldate.textContent= todaydate + " " + month + " " + year;

    let dayNames= days[now.getDay()];
    allDay.textContent= dayNames;

    let hours = now.getHours();
    let minutes = String(now.getMinutes()).padStart(2,"0");
    let seconds = String(now.getSeconds()).padStart(2,"0");

    
    let period;
    if (hours>=12){
        period="PM";
    }else{
        period="AM";
    }
    if(hours===0){
        hours =12;
    }else if(hours>12){
        hours= hours -12;

    }
    hours = String(hours).padStart(2,"0");

    time.textContent="Indian Time "+ hours+":" + minutes+":"+ seconds+" " + period;
        


},1000);

// Weather Api 

let cityInput = document.getElementById("city-input");
let searchBtn = document.getElementById("search-btn");

let cityName = document.getElementById("city-name");
let temperature = document.getElementById("temperature");
let condition = document.getElementById("condition");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let weatherIcon  = document.querySelector(".weather-icon");



searchBtn.addEventListener("click", getWeather);


async function getWeather() {
    loading.style.display="block";

    let city = cityInput.value.trim();
    if (city ===""){
        alert("please enter a city ")
        return;
    }
    try{
       let loactionResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
        let locationData = await loactionResponse.json();
        if(!locationData.results){
            alert("City not found");
            return;
        }
        let location = locationData.results[0];
        console.log(location);
        let latitude = location.latitude;
        let longitude = location.longitude;

        //weather Api
        let weatherResponse = await fetch(
`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
);
        let weatherData = await weatherResponse.json();
        let current = weatherData.current;
        //wether par data show karna 
        cityName.textContent=location.name;
        temperature.textContent=`${Math.round(current.temperature_2m)}°C`;

        humidity.textContent= `💧 Humidity:${current.relative_humidity_2m}%`;

        wind.textContent=`💨 Wind: ${current.wind_speed_10m} km/h`;

        condition.textContent = getWeatherCondition(current.weather_code);

        weatherIcon.textContent = getWeatherIcon(current.weather_code);
        loading.style.display = "none";
        cityInput.value= "";
}catch(error){
    console.log(error);
    loading.style.display="none";
    alert("Something Went Wrong");
}
}

function getWeatherCondition(code){
    if (code===0){
        return "Clear Sky";
    }
    if(code ===1 || code===2){
        return "Partly Cloudy";
    }
    if(code ===3){
        return "Cloudy";

    }
    if (code >=51 && code <=67){
        return "Rain";
    }
    if (code>=80 && code<=82){
        return "Rain Showers"
    }
    if(code>=95){
        return "Thunderstrom";
    }
    return "Unknown";
}
function getWeatherIcon(code){
    if(code===0){
        return "☀️"
    }
    if(code===1 || code ===2){
        return "⛅";
    }
    if(code===3){
        return "☁️"
    }
    if(code ===45 || code ===48){
        return "🌫️";
    }
    if(code>=51 && code <= 57){
        return "🌦️";
    }
    if(code>=61 && code <=67){
        return "🌧️";
    }
    if(code>=71 && code <= 77){
        return  "❄️";
    }
    if(code>=80 && code <=82){
        return "🌦️";
    } if(code>85 && code <= 86){
        return "🌨️";
    }
    if(code ===95){
        return "⛈️";
    }
    if (code ===96 || code ===99){
        return "⛈️";
    }
    return "🌡️";
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("service-worker.js")
            .then(function () {
                console.log("Service Worker Registered");
            })
            .catch(function (error) {
                console.log("Service Worker Error:", error);
            });
    });
}