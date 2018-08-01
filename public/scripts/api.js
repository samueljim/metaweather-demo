"use strict";

var proxy, api, url;
api = 'https://www.metaweather.com/api/';
proxy = ''
proxy = 'http://proxy.samueljim.com/'

// I attempted to use the following headers with no luck
// xhr.withCredentials = true;
// xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
// xhr.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With');
// xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
function newCorsHTTPXHR(type, url) {

}

// MAIN --------------------------------------------------------
// MetaWeather object is made for simple reused of the code
var MetaWeather = function () {
  this.apiUrl = api;
  this.proxy = proxy
  this.q = function (query) {
    url = (this.proxy + this.apiUrl) + query;
    console.log('Reqesting ' + url);
    return new Promise(function (resolve, reject) {
      var xhr = false;
      try {
        xhr = new XMLHttpRequest();

      } catch (e) {
        console.log(e);
      }
      if (xhr && "withCredentials" in xhr) {
        console.log("it's a standard Cors request");
        xhr.open("GET", url, true); // Standard Cors request
        xhr.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            resolve(xhr.response);
          } else {
            reject({
              status: this.status,
              statusText: xhr.statusText
            });
          }
        };
        xhr.onerror = function () {
          console.error('and something went wrong :( ');
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        };
        xhr.send();
      } else if (typeof XDomainRequest != "undefined") {
        console.log("it's a IE Cors request");
        xhr = new XDomainRequest(); // IE Cors request
        xhr.open("GET", url);
        xhr.onload = function () {
          this.readyState = 4;
          if (this.onreadystatechange instanceof Function)
            this.onreadystatechange();
          if (this.status >= 200 && this.status < 300) {
            resolve(xhr.response);
          } else {
            reject({
              status: this.status,
              statusText: xhr.statusText
            });
          }
        };
        xhr.onerror = function () {
          console.error('and something went wrong :( ');
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        };
        xhr.send();
      } else {
        console.log("there is no xhr support!");
      }
    });
  }
}

// search system 
// usage:
// .search().query(queryString)
// .search().latLon(queryString)
// .search().latLon({lat, lon})
MetaWeather.prototype.search = function () {
  var metaweather = this;

  return {
    query: function (queryString) {
      return metaweather.q("location/search/?query=" + queryString);
    },
    latLon: function (latLon) {
      if (typeof latLon === "object") {
        latLon = latLon.lat + "," + latLon.lon;
      }

      return metaweather.q("location/search/?lattlong=" + latLon);
    }
  };
};

// location system 
// usage:
// .location(woeid) // 2487956
// .location(woeid, dateString) // 2017/04/12 or 2017-04-12
// .location({woeid, dateString}) {woeid: 2487956, date: '2017/04/12'}
MetaWeather.prototype.location = function (location, date) {
  var metaweather = this;

  if (typeof date === "undefined" && typeof location === "number") {
    return metaweather.q("location/" + location);
  }

  if (typeof location === "object") {
    date = location.date;
    location = location.woeid;
  }

  if (typeof location === "number" && typeof date === "string") {
    return metaweather.q(
      "location/" + location + "/" + date.replace(/\-/g, "/")
    );
  }
};
// creation of api query object
var weather = new MetaWeather;
// tests of api wrapper
weather.search().query('sydney')
  .then(function (res) {
    console.log(res);
  }).catch(function (err) {
    console.error('Augh, there was an error!', err.statusText);
  });
