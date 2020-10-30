//OpenWeather API Key = 1e3ad008e239358d0ab3741145b4b149
//OpenWeather Endpoint for API Calls = https://api.openweathermap.org
//UV Index API = http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid=1e3ad008e239358d0ab3741145b4b149


var $cityName = $("#city-name");
var $cityTemp = $("#temperature");
var $cityHumid = $("#humidity");
var $cityWind = $("#wind-speed");
var $cityUV = $("#uv-index");
var cityArray = [];
var historyEl = $("#history");
var historyItem = JSON.parse(localStorage.getItem("userInput"));
console.log(historyItem);

//API call
function getWeather(city) {
  $("#city-name").empty();
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

function showHistory() {
  var historyItem = JSON.parse(localStorage.getItem(localStorage.key("userInput")));
  historyEl.innerHTML = "";
  console.log(historyItem)
  if (historyItem !== null) {
    for (i = 0; i < historyItem.length; i++) {
      var searchItem = document.createElement("input");
      searchItem.setAttribute("type", " text");
      searchItem.setAttribute("readonly", "true");
      searchItem.setAttribute("class", "form-control d-block bg-white");
      searchItem.setAttribute("value", historyItem[i]);
      searchItem.setAttribute("click", function () {
        getWeather(searchItem.value);
      });
      historyEl.append(searchItem);
    }
  }
}

showHistory();

function newHistory() {
  var historyItem = JSON.parse(localStorage.getItem(localStorage.key("userInput")));
  if (historyItem !== null) {
    var searchItem = document.createElement("input");
    console.log(historyItem)
    searchItem.setAttribute("type", " text");
    searchItem.setAttribute("readonly", "true");
    searchItem.setAttribute("class", "form-control d-block bg-white");
    searchItem.setAttribute("value", historyItem[historyItem.length - 1]);
    searchItem.setAttribute("click", function () {
      getWeather(searchItem.value);
    });
    historyEl.append(searchItem);
  }
}

$("#search-button").click(function () {
  var userInput = $("#city-input").val();
  console.log(userInput);
  cityArray.push(userInput);
  localStorage.setItem("userInput", JSON.stringify(cityArray));
  getWeather(userInput);
  newHistory();
});
