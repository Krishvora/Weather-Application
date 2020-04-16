import "../sass/main.scss";
import Current from './models/Location';
import Forecast from './models/Forecast';

import * as currentView from './views/curentView';
import * as forecastView from './views/forecastView';
import * as loaderView from './views/loaderView';
import * as resultView from './views/noresultView';

const state = {};


const globalController = async()=>{

    //Clear UI and Render Loader
    currentView.clearUI();
    loaderView.renderLoader();

    //Get User location via GeoLocation API
    state.current = new Current();
    await state.current.getCoords();
    console.log(state.current.coords.lat);
    console.log(state.current.coords.long);
    if(state.current.coords.lat && state.current.coords.long !== 0){

    state.forecast = new Forecast(state.current.coords.lat,state.current.coords.long);
    
    //Get Weather based on user lat and long
    await state.current.getWeatherData();
    await state.forecast.getForecast();
    
    
    //Data functions
    state.current.extractData();
    state.current.convertData();
    
    //Remove Loader
    loaderView.removeLoader();
    loaderView.removeLoader();

    //UI functions
    currentView.renderCurrent(state.current);
    state.forecast.data.forEach(el=>{
        forecastView.renderForecast(el);
    })
    console.log(state.forecast);

    }else{
        console.log("geolocation denied");
        loaderView.removeLoader();
        loaderView.removeLoader();
        resultView.rendernoResult();
    }
    
    
}

//Event Listeners

window.addEventListener('load',
    globalController()
);

