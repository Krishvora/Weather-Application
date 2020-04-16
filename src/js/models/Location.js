import Axios from "axios";

function getCurrentLocation(options) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve,
        ({ code, message }) => reject(Object.assign(new Error(message), { name: 'PositionError', code })),options);
    });
  }

export default class Current {
    constructor() {
      this.coords = [];
    }
  
    // Get coords of current location
    async getCoords() {
      try {
        const data = await getCurrentLocation({
          enableHighAccuracy: true,
          maximumAge: 0,
        });
        this.coords.lat = data.coords.latitude, 
        this.coords.long = data.coords.longitude;
      } catch (err) {
        console.log(err);
        this.coords.lat = 0;
        this.coords.long = 0;
      }
    }

    async getWeatherData(){
      const key = '7bd5bb1cc6103a243b490396fbced847';
      const proxy = 'https://cors-anywhere.herokuapp.com/';

      try{
        const res = await Axios(`${proxy}api.openweathermap.org/data/2.5/weather?lat=${this.coords.lat}&lon=${this.coords.long}&appid=${key}`);
        
        this.datares = res.data;
        
      }catch(error){
        console.log(`Unable to fetch weather from API. Error is ${error}`);
      }

    }

    extractData(){

      this.datares.weather.forEach(el=>{
        this.main = el.main;
        this.icon = el.icon;
      })
      this.name = this.datares.name;
      this.temp = this.datares.main.temp;
      this.mintemp = this.datares.main.temp_min;
      this.maxtemp = this.datares.main.temp_max;
      
    }

    convertData(){
      this.temp = Math.trunc(this.temp - (273.15));
      this.mintemp = Math.trunc(this.mintemp - (273.15));
      this.maxtemp = Math.trunc(this.maxtemp - (273.15));
    }

}