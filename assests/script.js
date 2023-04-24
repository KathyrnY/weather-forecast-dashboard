var APIKey = "b8a758dfd137c5b5b06017d7a3604538";
var callWeatherUrl= "https://api.openweathermap.org/data/2.5/onecall?";
var callGeoWeatherUrl = "http://api.openweathermap.org/geo/1.0/direct?qu";
var city = "";
var enterCity = document.querySelector("#searchCity");
var searchBtn = document.querySelector("#searchButton");
var cityDisplayEL = document.querySelector("#city-display-info");
var currentWeatherEL = document.querySelector("#current-display-info");
var forecastEL = document.querySelector("#forecast-blocks");

// Store city info
// function storeCity(cityName) {
//     cityArray = localStorage.setItem("searchedCity", JSON.stringify(cityName));
//     console.log(cityArray)
// }
// Array to use in local storage
var showHistory = [];

// adding event listener to local storage button
var cityButton = function() {
var city = localStorage.getItem("city")
    if (city) {
        showHistory = JSON.parse(city);
        console.log(showHistory);
        searchBtn.innerHTML = '';
        for (var i = 0; i < showHistory.length; i++) {
            (function() {
                searchBtn.addEventListener("click", function() {
                    getCityInfoByName(searchBtn.innerText);
                })
            })
        }
    }
}
// This will function will search for information 
var searchHandler = function (event) {
    event.preventDefault();
}

var retrieveWeather = function (weatherApiData, searchTerm)) {
    if (weatherApiData.length === 0) {

    }
var requestWeatherUrl = callWeatherUrl + "lat=" + lat + "&lon" + lon + "&appid=" + APIKey + "&units=imperial";

fetch(requestWeatherUrl)
.then(function(response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    currentWeatherEL.innerHTML = "";

    var temp = data.current.temp;
    var showTemp = document.createElement("p")
    showTemp.textContent = "Temp: " + temp + "°F";

    var wind = data.current.wind_speed;
    var showWind = document.createElement("p")
    showWind.textContent = "Wind: " + wind + " MPH";

    var humidity = data.current.humidity;
    var showHumidity = document.createElement("p")
    showHumidity.textContent = "Humidity: " + humidity + "%";

    var iconImg = document.createElement("img");
    iconImg.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    
    currentWeatherEL.append(
        showTemp, showWind, showHumidity, iconImg
    );
    currentWeatherEL.setAttribute("class", "main")
  })
    // Shows current name for city in city info section
    var cityName = searchTerm;
    console.log(cityName);
    var showCityName = document.createElement("h2");
    showCityName.classList.add("additive");
    currentWeatherEL.appendChild(showCityName);
    showCityName.textContext = "Today's Weather for " + cityName;



    // var card = document.createElement("div");
    // card.classList.add("card-body", "m-3")
    // forecastEL.appendChild(card);

    // var currentDate = document.createElement("h5");
    // currentDate.classList.add("date-text");
    // card.appendChild(currentDate);
    // DataTransferItemList.textContent = 
})