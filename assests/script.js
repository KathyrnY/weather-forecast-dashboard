var APIKey = "b8a758dfd137c5b5b06017d7a3604538";
var callWeatherUrl= "https://api.openweathermap.org/data/2.5/onecall?";
var callGeoWeatherUrl = "http://api.openweathermap.org/geo/1.0/direct?qu";
// var city = "";
var containerEL = document.querySelector(".container")
containerEL.classList.add("row");
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
var showHistory = enterCity.value;

// adding event listener to local storage button
// var cityButton = function() {
var city = localStorage.getItem("city")
    if (city) {
        showHistory = JSON.parse(city);
        console.log(showHistory);
        searchBtn.innerHTML = '';
        for (let i = 0; i < showHistory.length; i++) {
            (function() {
                searchBtn.textContent = showHistory[i];

                searchBtn.addEventListener("click", function() {
                    getCityInfoByName(searchBtn.innerText);
                })
            })
        }
    }
// }
// This will function will search for information 
var searchHandler = function (event) {
    event.preventDefault();
    console.log(">>>Hi<<<")
    var searchedCities = enterCity.value;
    if (searchedCities) {
        pullUrlName(searchedCities);
        enterCity.value = searchedCities;
        localStorage.setItem("city", JSON.stringify(showHistory));
    } else {
        alert("No Info")
    }
}

// This function will access API within the search button function to obtain a city with lats/lons
var pullUrlName = function (city) {
    var cityGetUrl = callGeoWeatherUrl + city + '&appid=' + APIKey;
    fetch(cityGetUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
            retrieveWeather(data, city);
            });
        } else {

        }
    })
    .catch(function (error) {
        console.log("No Info Found");
    });
};

// This will show no data found in two divs located in HTML. Also, it connects the city name API to lat and lon
var retrieveWeather = function (weatherApiData, searchTerm) {
    if (weatherApiData.length === 0) {
        currentWeatherEL.textContent = "No data found";
        return;
    }
    var lat = weatherApiData[0].lat
    var lon = weatherApiData[0].lon
    var requestWeatherUrl = callWeatherUrl + "lat=" + lat + "&lon" + lon + "&appid=" + APIKey + "&units=imperial";

fetch(requestWeatherUrl)
.then(function(response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    // This will clear out your previous search entries
    currentWeatherEL.innerHTML = "";

        // Shows current name for city in city info section
        var cityName = searchTerm;
        console.log(cityName);
        var showCityName = document.createElement("h2");
        showCityName.classList.add("additive");
        currentWeatherEL.appendChild(showCityName);
        showCityName.textContext = "Today's Weather for " + cityName;

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
  .catch(function(error){
    console.log(error);
  });
};



    var retrieveWeather = function (weatherApiData, searchTerm) {
        if (weatherApiData.length === 0) {
            forecastEL.textContent = "No data found";
            return;
        }
        var lat = weatherApiData[0].lat
        var lon = weatherApiData[0].lon
        var requestWeatherUrl = callWeatherUrl + "lat=" + lat + "&lon" + lon + "&appid=" + APIKey + "&units=imperial";
    
    fetch(requestWeatherUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        // This will clear out your previous search entries
       forecastEL.innerHTML = "";


    // var card = document.createElement("div");
    // card.classList.add("card-body", "m-3")
    // forecastEL.appendChild(card);

    // var currentDate = document.createElement("h5");
    // currentDate.classList.add("date-text");
    // card.appendChild(currentDate);
    // DataTransferItemList.textContent = 
})