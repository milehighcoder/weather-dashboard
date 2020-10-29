//OpenWeather API Key = 1e3ad008e239358d0ab3741145b4b149
//OpenWeather Endpoint for API Calls = https://api.openweathermap.org
//Example of API call: api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=1e3ad008e239358d0ab3741145b4b149

var $cityName = $("#city-name");
var $cityTemp = $('#temperature');
var $cityHumid = $('#humidity');
var $cityWind = $('#wind-speed');

$.ajax({
  type: "GET",
  url:"https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=imperial&APPID=1e3ad008e239358d0ab3741145b4b149",
  success: function (cityJSON) {
    console.log("success", cityJSON);
    $cityName.append('<h2>' + cityJSON.name + '</h2>');
    $cityTemp.append('Temperature: ', cityJSON.main.temp, " &deg;F");
    $cityHumid.append('Humidity: ', cityJSON.main.humidity, "%");
    $cityWind.append('Wind Speed: ', cityJSON.wind.speed, " MPH");
  },
});

//Make an event listener for the search button
//put AJAX code inside the eventListener function
//store the search (setItem) to localStorage
//Generate the dynamic URL query parameters
//UV Index will be a separate API call