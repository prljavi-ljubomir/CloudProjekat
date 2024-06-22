let container = document.getElementById('cont');
let notFound = document.getElementById('not-found');
let btn = document.getElementById('search-button');
let res = document.getElementById('results');
let city = "";
let inputField = document.getElementById('location');

function errorFound(){
    container.classList.remove('for-search');
    notFound.style.display = "flex";
    res.style.display = "none";
}

function weatherDisplay(){
    container.classList.remove('for-search');
    res.style.display = "flex";
    notFound.style.display = "none";
}

function otherClick(e){
    if(e.target !== btn && e.target !== inputField){
        container.classList.add('for-search');
        notFound.style.display = "none";
        res.style.display = "none";
    }
}

async function checkWeather(){
    city = document.querySelector('.input-section input').value;
    const APIkey = '4ee4cd1d74ddc4fc3901fc8b665475d0';
    const APIurl = "https://api.openweathermap.org/data/2.5/weather?"
    //'https://api.openweathermap.org/data/2.5/weather?q=germany&appid=4ee4cd1d74ddc4fc3901fc8b665475d0&units=metric';
    const req = APIurl + `q=${city}&appid=` + APIkey + `&units=metric`;
    const response = await fetch(APIurl + `q=${city}&appid=` + APIkey + `&units=metric`);
    var data = await response.json();
    //console.log(data);
    if(!response.ok){
        errorFound();
    }else{
        document.getElementById('tmp').innerHTML = Math.round(data.main.temp) + "°C";
        document.getElementById('weather-desc').innerHTML = data.weather[0].main;
        var photo = document.getElementById('weather-desc').innerHTML = data.weather[0].main;
        document.getElementById('hum-per').innerHTML = data.main.humidity + "%";
        document.getElementById('wind-per').innerHTML = Math.round(data.wind.speed) + "km/h";
        weatherIcon = document.getElementById('weather-icon');
        switch(photo){
            case "Clear":
                weatherIcon.src = "../images/sunny.png";
                break;
            case "Clouds":
                weatherIcon.src = "../images/cloud.png";
                break;
            case "Rain":
                weatherIcon.src = "../images/rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "../images/drizzle.png";
                break;
            case "Fog":
                weatherIcon.src = "../images/mist.png";
                break;
            case "Snow":
                weatherIcon.src = "../images/snow.png";
                break
        }
        weatherDisplay();
    }
}
document.body.addEventListener("click", otherClick);
btn.addEventListener("click", checkWeather);

