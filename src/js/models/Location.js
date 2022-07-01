import Axios from "axios";

function getCurrentLocation(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      ({ code, message }) =>
        reject(Object.assign(new Error(message), { name: "PositionError", code })),
      options
    );
  });
}

export default class Current {
  constructor() {
    this.coords = [];
    this.error = false;
  }

  // Get coords of current location
  async getCoords() {
    const data = await getCurrentLocation({
      enableHighAccuracy: true,
      maximumAge: 0,
    })
      .then((data) => {
        this.coords.lat = data.coords.latitude;
        this.coords.long = data.coords.longitude;
      })
      .catch((error) => {
        this.error = true;
        alert("Please enable the browser to access your location." + error);
      });
  }

  async getWeatherData() {
    const key = "7bd5bb1cc6103a243b490396fbced847";
    const res = await Axios(
      `https://crossoriginrequests.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${this.coords.lat}&lon=${this.coords.long}&appid=7bd5bb1cc6103a243b490396fbced847`
    )
      .then((res) => {
        this.datares = res.data;
      })
      .catch((error) => {
        console.log("Weather " + error);
      });
  }

  extractData() {
    this.datares.weather.forEach((el) => {
      this.main = el.main;
      this.icon = el.icon;
    });
    this.name = this.datares.name;
    this.temp = this.datares.main.temp;
    this.mintemp = this.datares.main.temp_min;
    this.maxtemp = this.datares.main.temp_max;
  }

  convertData() {
    this.temp = Math.trunc(this.temp - 273.15);
    this.mintemp = Math.trunc(this.mintemp - 273.15);
    this.maxtemp = Math.trunc(this.maxtemp - 273.15);
  }
}
