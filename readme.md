# metaweather demo

after inporting api.js you can use this

```js
var weather = new MetaWeather();

// Use string query to location info and woeid
weather
  .search()
  .query("san fran")
  .then(function(response) {
    console.log(response.body);
  });

// Search locations nearby with Lat/Lon
// …as string:
weather
  .search()
  .latLon("37.777119, -122.41964")
  .then(function(response) {
    console.log(response.body);
  });

// …or object:
weather
  .search()
  .latLon({ lat: 37.777119, lon: -122.41964 })
  .then(function(response) {
    console.log(response.body);
  });

// Get current location weather data with woeid
weather.location(2487956).then(function(response) {
  console.log(response.body);
});

// Get location weather from a specific date
// …as string:
weather.location(2487956, "2017-04-05").then(function(response) {
  console.log(response.body);
});

// …or object:
weather
  .location({ woeid: 2487956, date: "2017/04/05" })
  .then(function(response) {
    console.log(response.body);
  });
```
