import "./main.scss";
import Current from "./js/models/Location";
import Forecast from "./js/models/Forecast";

import * as currentView from "./js/views/curentView";
import * as forecastView from "./js/views/forecastView";
import * as loaderView from "./js/views/loaderView";
import * as resultView from "./js/views/noresultView";

let state = {};

const globalController = async () => {
  //Clear UI and Render Loader
  currentView.clearUI();
  loaderView.renderLoader();

  //Initialise empty state with coords
  state.current = new Current();
  // Get Geolocation Coordinnates
  await state.current.getCoords();
  console.log(state);
  // Check if geolocation worked
  if (state.current.error !== true) {
    // Initialise Forecast lat and long from Current
    state.forecast = new Forecast(state.current.coords.lat, state.current.coords.long);
    console.log(state);
    //Get Weather based on user lat and long
    await state.current.getWeatherData();
    await state.forecast.getForecast();
    if (state.current.datares && state.forecast.data) {
      //Data functions
      state.current.extractData();
      state.current.convertData();

      //Remove Loader
      loaderView.removeLoader();

      //UI functions
      currentView.renderCurrent(state.current);
      forecastView.renderHeader();
      state.forecast.data.forEach((el) => {
        forecastView.renderForecast(el);
      });
    } else {
      console.log("API Error");
      loaderView.removeLoader();
      resultView.apiResult();
    }
  } else {
    // Browser denied or unable to get user location
    console.log("Geolocation Error");
    loaderView.removeLoader();
    resultView.geolocationResult();
  }
};

//Event Listeners

window.addEventListener("load", globalController());
