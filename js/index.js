
document.getElementById("weatherForm").addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    //set the search button to loading introducing a svg icon, remembering that the button is a input type
    document.getElementById("searchButton").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="spinner" fill=white viewBox="0 0 512 512"><path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z"/></svg>`
    //also set the search button to disabled
    document.getElementById("searchButton").disabled = true;
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

            //set the search button to search text
            document.getElementById("searchButton").innerHTML = "Search";
            //also set the search button to enabled
            document.getElementById("searchButton").disabled = false;
            
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