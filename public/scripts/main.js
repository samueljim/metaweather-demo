var weather = new MetaWeather('http://proxy.samueljim.com/');
var $ = function (id) {
  return document.getElementById(id);
};
var temp1, temp2;

var iconKey = {
  cloud: '<i class="fas fa-cloud"></i>',
  sun: '<i class="fas fa-sun"></i>',
  rain: '<i class="fas fa-umbrella"></i>'
}
// fuction returns a string stating which city is wammer
function whichIsWarmer() {
  var city1 = $('city1').value;
  var city2 = $('city2').value;
  var text = ' is warmer then '
  if (temp1 && temp2) {
    if (temp1 > temp2) {
      return city1 + text + city2;
    } else {
      return city2 + text + city1;
    }
  } else {
    return 'loading...'
  }
}

function roundAndFormat(weatherNow) {
  var maxMin =
    "Max: " + (Math.round(weatherNow.max_temp * 100) / 100) +
    "  <br> Min: " + (Math.round(weatherNow.min_temp * 100) / 100);
  var temp = Math.round(weatherNow.the_temp * 100) / 100 + '°C';
  var icon = "<img width='80' src='https://www.metaweather.com/static/img/weather/" + weatherNow.weather_state_abbr + ".svg' alt='Icon for " + weatherNow.weather_state_name + "'>"
  var type = weatherNow.weather_state_name;
  var wind = "<i style='transform: rotate(" + Math.floor(weatherNow.wind_direction) + "deg);' class='fas fa-arrow-up'></i>"

  return {
    maxMin,
    temp,
    icon,
    type,
    wind
  }

}

function updateScreen(city, weather) {
  if (city === 'city1') {
    temp1 = weather.temp;
  } else {
    temp2 = weather.temp;
  }
  $(city + "MaxMin").innerHTML = weather.maxMin;
  $(city + "Temp").innerHTML = weather.temp;
  $(city + "Icon").innerHTML = weather.icon;
  $(city + "Type").innerHTML = weather.type;
  $(city + "Wind").innerHTML = weather.wind;
  $('output').innerHTML = whichIsWarmer();
}

function updateCity(city) {
  var currerntCity = $(city).value;
  weather
    .search()
    .query(currerntCity)
    .then(function (res) {
      var cityInfo = JSON.parse(res.response);
      console.info(cityInfo[0]);
      weather
        .location(cityInfo[0].woeid)
        .then(function (res) {
          var weatherInfo = JSON.parse(res.response);
          var weatherNow = weatherInfo.consolidated_weather[0];
          console.log(weatherNow);
          var formatted = roundAndFormat(weatherNow);
          console.log(formatted);
          updateScreen(city, formatted);
        })
        .catch(function (err) {
          console.log(err);
          console.error("Augh, there was an error!", err.statusText);
        });
    })
    .catch(function (err) {
      console.error("Augh, there was an error!", err.statusText);
    });
}

function setup() {
  console.info("Updating weather");
  updateCity("city1");
  updateCity("city2");
}
// setup();

// update every 30 seconds
var updating = setInterval(setup(), 30000);
