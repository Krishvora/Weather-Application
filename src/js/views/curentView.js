import {elements} from './elements';

export const renderCurrent = location =>{
    const markup = `
            <h2 class="weatherbox__testhead">${location.name}</h2>
            <div class="weatherbox__details">
                <img src="./img/weather/${location.icon}.svg" alt="Weather" class="weatherbox__details--icon">
                <div class="weatherbox__details--temp">${location.temp} &deg;C</div>
            </div>

            

            <div class="weatherbox__info">
                <div class="weatherbox__info--type">${location.main}</div>
                <div class="weatherbox__info--minmax">${location.mintemp} &deg;C <span>|</span> ${location.maxtemp} &deg;C</div>
            </div>
    `;

    elements.weatherBox.insertAdjacentHTML("beforeend",markup);
}

export const clearUI = () =>{
    elements.predictWrapper.innerHTML = '';
    elements.weatherBox.innerHTML = '';
}
