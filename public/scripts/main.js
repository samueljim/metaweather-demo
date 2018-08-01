weather = new MetaWeather;

function updateCity1() {
  var city1 = document.getElementById("city1").value;
  weather.search().query(city1)
    .then(function (res) {
      console.info(res.response);
      weather.location(res.response.woeid).then(function (res) {
        console.info(res.response);
      }).catch(function (err) {
        console.error('Augh, there was an error!', err.statusText);
      });
    }).catch(function (err) {
      console.error('Augh, there was an error!', err.statusText);
    });
}

function updateCity2() {
  var city2 = document.getElementById("city2").value;
  weather.search().query(city2)
    .then(function (res) {
      console.info(res.response);

    }).catch(function (err) {
      console.error('Augh, there was an error!', err.statusText);
    });
}

updateCity1();
updateCity2();
