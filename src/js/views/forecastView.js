import { elements } from "./elements";

export const renderForecast = (el) => {
  const markup = `
        <div class="predictbox">
            <div class="predictbox__title">${el.date}</div>

            <div class="predictbox__details">

                <img src="./assets/weather/${el.icon}.svg" alt="Weather Forecast" class="predictbox__weather">

                <div class="predictbox__info">
                    <div class="predictbox__info--type">${el.name}</div>
                    <div class="predictbox__info--minmax">${el.temp_min} &deg;C <span>|</span> ${el.temp_max} &deg;C</div>
                </div>

                <div class="predictbox__temp">${el.temp} &deg;C</div>

            </div> 
        </div>`;
  elements.predictWrapper.insertAdjacentHTML("beforeend", markup);
};

export const renderHeader = () => {
  const header = `<div class="futureforecast">Forecast for the next 5 days</div>`;
  elements.predictWrapper.insertAdjacentHTML("beforeend", header);
};
