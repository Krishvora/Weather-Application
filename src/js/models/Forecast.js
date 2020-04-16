import Axios from "axios";
import moment from 'moment';

export default class Forecast{
    constructor(lat,long){
        this.lat = lat;
        this.long = long;
    }

    async getForecast(){
        const key = '7bd5bb1cc6103a243b490396fbced847';
        const proxy = 'https://cors-anywhere.herokuapp.com/';

        try{
            const res = await Axios(`${proxy}api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.long}&appid=${key}`);
            this.data = res.data.list.map(el => ({
                date: moment.unix(el.dt).utc().format('dddd, Do MMMM, HH:mm'),
                temp: Math.round(el.main.temp - (273.15)),
                temp_max: Math.round(el.main.temp_max - (273.15)),
                temp_min: Math.round(el.main.temp_min - (273.15)),
                name: el.weather[0].main,
                icon: el.weather[0].icon,
              }));
        
        }catch{

        }
    }
}