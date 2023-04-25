var APIKey = "b8a758dfd137c5b5b06017d7a3604538";
var callWeatherUrl= "https://api.openweathermap.org/data/3.0/onecall?";
var callGeoWeatherUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
var containerEL = document.querySelector(".container")
// containerEL.classList.add("row");
var enterCity = document.querySelector("#searchCity");
var searchBtn = document.querySelector("#searchButton");
var cityDisplayEL = document.querySelector("#city-display-info");
var currentWeatherEL = document.querySelector("#current-display-info");
var forecastEL = document.querySelector("#forecast-blocks");


//
var showHistory = [];


// adding event listener to local storage button
// var cityButton = function() {
var city = localStorage.getItem("city")
    if (city) {
        showHistory = JSON.parse(city);
        console.log(showHistory);
        // searchBtn.innerHTML = '';
        for (let i = 0; i < showHistory.length; i++) {
            let cityName = showHistory[i];
            let cityButton = document.createElement("button");
            cityButton.textContent = cityName;
            cityButton.addEventListener("click", function() {
                getCityInfoByName(cityName);
            });
            searchBtn.appendChild(cityButton);
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
        // showHistory.push(searchedCities);
        console.log(searchedCities);
        localStorage.setItem("city", JSON.stringify(showHistory));
        let cityName = searchedCities;
        let cityButton = document.createElement("button");
        cityButton.textContent = cityName;
        cityButton.addEventListener("click", function() {
            getCityInfoByName(cityName);
        });
        searchBtn.appendChild(cityButton); //This is storing the showHistory array in local storage
    } else {
        alert("No Info")
    }
}

// This function will access API within the search button function to obtain a city with lats/lons
var pullUrlName = function (city) {
    var url = callGeoWeatherUrl + city + '&appid=' + APIKey;
    fetch(url)
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
        currentWeatherEL.textContent = "No Data Found";
        forecastEL.textContent = "No Data Found";
        return;
    }
    var lat = weatherApiData[0].lat
    var lon = weatherApiData[0].lon
    console.log(lat, lon)
    var requestWeatherUrl = callWeatherUrl + "lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";

fetch(requestWeatherUrl)
.then(function(response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    // This will clear out your previous search entries
    currentWeatherEL.innerHTML = "";
    forecastEL.innerHTML = "";

        // Shows current name for city in city info section
        var cityName = searchTerm;
        console.log(cityName);
        var showCityName = document.createElement("h2");
        showCityName.textContext = "Today's Weather for " + cityName;
        cityDisplayEL.appendChild(showCityName);

    var retrieveDate = new Date(data.dt * 1000).toLocaleDateString("en-US");
    var retrieveDateEl = document.createElement("p");
    retrieveDateEl.textContent = retrieveDate;

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
    var icon = data.current.weather[0].icon;
    iconImg.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    
    currentWeatherEL.append(
        showTemp, showWind, showHumidity, iconImg
    );
    // Modified code with help from TA Daniel
    currentWeatherEL.setAttribute("class", "main")
        for (let i = 0; i < 5; i++) {
            var date = moment(new Date());
             var dtUnixFormatting = date.format("DD MM YYYY")//.format(data.daily[i].dt).format('MMMM Do, YYYY');
            var tempBlock = data.daily[i].temp.day;
            var windBlock = data.daily[i].wind_speed;
            var humidityBlock = data.daily[i].humidity;
            var weatherIcon = data.daily[i].weather[0].icon;
            // var weatherDescription = data.daily[i].weather[0].description
            

            var forecastCard = document.createElement("div");
            forecastCard.classList.add("card-body", "m-3")

            var currentDate = document.createElement("h4");
            forecastCard.appendChild(currentDate);
            var iconImgEl = document.createElement("img");
            iconSrc = 'https://openweathermap.org/img/wn/' + weatherIcon + '.png';
            forecastCard.appendChild(iconImgEl);
            var tempData = document.createElement("p");
            forecastCard.appendChild(tempData);
            var windData = document.createElement("p");
            forecastCard.appendChild(windData);
            var humidityData = document.createElement("p");
            forecastCard.appendChild(humidityData);

             forecastEL.appendChild(forecastCard);
        
            currentDate.textContent = dtUnixFormatting;
            tempData.textContent = "Temp: " + tempBlock + "°F";
            windData.textContent = "Wind: " + windBlock + " MPH";
            humidityData.textContent = "Humidity: " + humidityBlock + "%";

            forecastEL.setAttribute("class", "five-day-forecast-card");

            currentDate.classList.add("card-text");
            tempData.classList.add("card-text");
            windData.classList.add("card-text");
            humidityData.classList.add("card-text");
        }
  })

  .catch(function(error){
    console.log(error);
  });
};

searchBtn.addEventListener("click", searchHandler);

