import {elements} from './elements';

export const renderLoader =()=>{
    const markup =`
        <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
    `;

 elements.weatherBox.insertAdjacentHTML('beforeend',markup);
}

export const removeLoader = ()=>{
    const loader = document.querySelector('.spinner');
    if(loader){
        loader.parentElement.removeChild(loader);
    }
}