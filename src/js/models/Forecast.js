import Axios from "axios";
import moment from "moment";

export default class Forecast {
  constructor(lat, long) {
    this.lat = lat;
    this.long = long;
  }

  async getForecast() {
    const key = "7bd5bb1cc6103a243b490396fbced847";
    const proxy = "https://cors-anywhere.herokuapp.com/";

    const res = await Axios(
      "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=7bd5bb1cc6103a243b490396fbced847"
    )
      .then((res) => {
        this.data = res.data.list.map((el) => ({
          date: moment.unix(el.dt).utc().format("dddd, Do MMMM, HH:mm"),
          temp: Math.round(el.main.temp - 273.15),
          temp_max: Math.round(el.main.temp_max - 273.15),
          temp_min: Math.round(el.main.temp_min - 273.15),
          name: el.weather[0].main,
          icon: el.weather[0].icon,
        }));
      })
      .catch((error) => {
        console.log("Forecast " + error);
      });
  }
}
