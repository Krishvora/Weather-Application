import {elements} from './elements';

export const geolocationResult = ()=>{
    const markup = `
    <h2 class="noresult">Please enable the browser to access your location.</h2>
    `;

    elements.weatherBox.insertAdjacentHTML('beforeend',markup);
}

export const apiResult = ()=>{
    const markup = `
    <h2 class="noresult">Couldn't connect to the API. Please try again later.</h2>
    `;

    elements.weatherBox.insertAdjacentHTML('beforeend',markup);
}