
document.getElementById("weatherForm").addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    //prevent default
    e.preventDefault();
    //get the input
    const city = document.getElementById("city").value;
    //url for API
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c7959b7dc8185bd8490e3e45d2f7cb61&units=metric`
    //fetch the data
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            //make assurance that the city is valid
            if (data.cod == "404") {
                //display error message function
                // displayError();
                alert("City not found");
            }
            //display the data
            displayData(data);
        })
        .catch(err => {
            alert("Network error");
            console.log(err)
        });
    //clean the input
    document.getElementById("city").value = "";
}

function displayData(data) {
    //get the elements
    const city = document.getElementById("cityName");
    const temp = document.getElementById("temp");
    const weather = document.getElementById("weather");
    const feelsLike = document.getElementById("feelsLike");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");
    //display the data
    temp.innerText = data.main.temp + "°C";
    //capitalize the first letter
    city.innerText = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    weather.innerText = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    feelsLike.innerText = data.main.feels_like + "°C";
    humidity.innerText = data.main.humidity + "%";
    wind.innerText = data.wind.speed + "km/h";
    //change the background image by the weather main
    const weatherMain = data.weather[0].main;
    //get the element
    const body = document.getElementById("body");
    //change the background image
    if (weatherMain == "Clouds") {
        body.style.backgroundImage = "url(../images/cloudy.jpg)";
    } else if (weatherMain == "Clear") {
        body.style.backgroundImage = "url(../images/clear.jpg)";
    } else if (weatherMain == "Rain") {
        body.style.backgroundImage = "url(../images/rain.jpg)";
    } else if (weatherMain == "Snow") {
        body.style.backgroundImage = "url(../images/snow.jpg)";
    } else if (weatherMain == "Thunderstorm") {
        body.style.backgroundImage = "url(../images/thunderstorm.jpg)";
    } else if (weatherMain == "Drizzle") {
        body.style.backgroundImage = "url(../images/drizzle.jpg)";
    } else if (weatherMain == "Mist") {
        body.style.backgroundImage = "url(../images/mist.jpg)";
    } else {
        body.style.backgroundImage = "url(../images/clear.jpg)";
    }
    //also set the background image as cover and no repeat 
    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
    //set articles to display flex 
    document.getElementById("resultWeather").style.display = "flex";
    //also result-extra
    document.getElementById("resultInfo").style.display = "flex";
    //set the footer margin top to 2rem
    document.getElementById("footer").style.marginTop = "1rem";
}

// function displayError() {
//     //get the element
//     const error = document.getElementById("error");
//     //display the error
//     error.style.display = "block";
//     //set articles to display none
//     document.getElementById("result").style.display = "none";
//     //also result-extra
//     document.getElementById("result-extra").style.display = "none";
// }