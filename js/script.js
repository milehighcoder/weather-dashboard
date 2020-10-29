//OpenWeather API Key = 1e3ad008e239358d0ab3741145b4b149
//OpenWeather Endpoint for API Calls = https://api.openweathermap.org
//Example of API call: api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=1e3ad008e239358d0ab3741145b4b149

var $cityName = $("#city-name");
var $cityTemp = $("#temperature");
var $cityHumid = $("#humidity");
var $cityWind = $("#wind-speed");
var cityArray = [];

$("#search-button").click(function () {
  //local scope
  var userInput = $("#city-input").val();
  cityArray.push(userInput);
  localStorage.setItem("userInput", JSON.stringify(cityArray));
  currentWeather(userInput);
  searchHistory();
});

function currentWeather(city) {
  //global scope
  $("#city-name").empty();
  $("#temperature").empty();
  $("#humidity").empty();
  $("#wind-speed").empty();
  $.ajax({
    type: "GET",
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&APPID=1e3ad008e239358d0ab3741145b4b149",
    success: function (cityJSON) {
      console.log("success", cityJSON);
      $cityName.append("<h2>" + cityJSON.name + "</h2>");
      $cityTemp.append("Temperature: ", cityJSON.main.temp, " &deg;F");
      $cityHumid.append("Humidity: ", cityJSON.main.humidity, "%");
      $cityWind.append("Wind Speed: ", cityJSON.wind.speed, " MPH");
    },
  });
}

function searchHistory() {
  var historyItem = JSON.parse(localStorage.getItem("userInput")); //later move this to global scope
  //clear out the area I want to display the history
  //loop through the history item. For loop or for each method would work
  //create a button, put city name onto button, and append the button to the area I want to display the name
  //print out a button or whatever element tag I want to use
  //
}

//UV Index will be a separate API call
