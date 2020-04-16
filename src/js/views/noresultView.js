import {elements} from './elements';
export const rendernoResult = ()=>{
    const markup = `
    <h2 class="noresult">Please enable the browser to access your location.</h2>
    `;

    elements.weatherBox.insertAdjacentHTML('beforeend',markup);
}