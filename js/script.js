//OpenWeather API Key = 1e3ad008e239358d0ab3741145b4b149
//OpenWeather Endpoint for API Calls = https://api.openweathermap.org

var $cityName = $("#city-name");
var $cityTemp = $("#temperature");
var $cityHumid = $("#humidity");
var $cityWind = $("#wind-speed");
var cityArray = [];
var historyEl = $("#history");
var historyItem = JSON.parse(localStorage.getItem("userInput"));
console.log(historyItem);

function currentWeather(city) {
  $("#city-name").empty(); //global scope
  $("#temperature").empty();
  $("#humidity").empty();
  $("#wind-speed").empty();
  $.ajax({
    type: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=1e3ad008e239358d0ab3741145b4b149",
    success: function (cityJSON) {
      console.log("success", cityJSON);
      $cityName.append("<h2>" + cityJSON.name + "</h2>");
      $cityTemp.append("Temperature: ", cityJSON.main.temp, " &deg;F");
      $cityHumid.append("Humidity: ", cityJSON.main.humidity, "%");
      $cityWind.append("Wind Speed: ", cityJSON.wind.speed, " MPH");
    },
  });
}

$("#search-button").click(function () {
  var userInput = $("#city-input").val(); //local scope
  console.log(userInput);
  cityArray.push(userInput);
  localStorage.setItem("userInput", JSON.stringify(cityArray));
  currentWeather(userInput);
  searchHistory();
});

function searchHistory() {
  historyEl.innerHTML = "";
  if (historyItem !== null) {
    for (i = 0; i < historyItem.length; i++) {
      var searchItem = document.createElement("input");
      searchItem.setAttribute("type", " text");
      searchItem.setAttribute("readonly", "true");
      searchItem.setAttribute("class", "form-control d-block bg-white");
      searchItem.setAttribute("value", historyItem[i]);
      searchItem.setAttribute("click", function () {
        currentWeather(searchItem.value);
      });
      historyEl.append(searchItem);
    }
  }
}

searchHistory();
