// import api = './api.js'

var mw = new MetaWeather;

mw.search().query('san fran').then(function (response) {
  console.log(response.body);
});
