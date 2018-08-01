var proxy, api;
api = 'https://www.metaweather.com/api/';
proxy = ''
// proxy = 'http://proxy.samueljim.com/'


function newCorsHTTPXHR(type, url) {
  var xhr = false;
  try {
    xhr = new XMLHttpRequest();

  } catch (e) {
    console.log(e);
  }
  if (xhr && "withCredentials" in xhr) {
    console.log(url);
    console.log("Standard Cors request support");
    xhr.open(type, url, true); // Standard Cors request
    // xhr.withCredentials = true;
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'localhost');
    // xhr.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With');

    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  } else if (typeof XDomainRequest != "undefined") {
    console.log("IE Cors request");
    xhr = new XDomainRequest(); // IE Cors request
    xhr.open(type, url);
    xhr.onload = function () {
      this.readyState = 4;
      if (this.onreadystatechange instanceof Function)
        this.onreadystatechange();
    };
  } else if (xhr) {
    console.log("backup Cors request");
    xhr.open(type, url, true); // backup Cors request
  }
  return xhr;
}

// MAIN --------------------------------------------------------
// MetaWeather object is made for simple reused of the code
var MetaWeather = function () {
  this.apiUrl = api;
  this.proxy = proxy
  this.p = function (query) {
    var xhr = newCorsHTTPXHR("GET", (this.proxy + this.apiUrl) + query);
    if (xhr.readyState == 4) {
      console.log(xhr.responseText);
      return xhr.responseText
    }
    xhr.send();
  };

};

MetaWeather.prototype.search = function () {
  var metaweather = this;

  return {
    query: function (queryString) {
      return metaweather.p("location/search/?query=" + queryString);
    },
    latLon: function (latLon) {
      if (typeof latLon === "object") {
        latLon = latLon.lat + "," + latLon.lon;
      }

      return metaweather.p("location/search/?lattlong=" + latLon);
    }
  };
};

MetaWeather.prototype.location = function (location, date) {
  var metaweather = this;

  if (typeof date === "undefined" && typeof location === "number") {
    return metaweather.p("location/" + location);
  }

  if (typeof location === "object") {
    date = location.date;
    location = location.woeid;
  }

  if (typeof location === "number" && typeof date === "string") {
    return metaweather.p(
      "location/" + location + "/" + date.replace(/\-/g, "/")
    );
  }
};
// creation of api query object
var mw = new MetaWeather;
// tests of api wrapper 

mw.search().query('london').then(function (res) {
  // console.log(res.body);
  console.log(res);
});

// mw.search().latLon('37.777119, -122.41964').then(function (res) {
//   console.log(res.body);
// });
