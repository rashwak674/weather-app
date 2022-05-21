import{addSpinner} from "/domFunctions.js";
import CurrentLocation from "./CurrentLocation.js";
const currentLoc = new CurrentLocation();

const initApp = () => {
    //add listeners
    const geoButton = document .getElementById("getLocation");
    geoButton.addEventListener("click", getGeoWeather);
    //set up

    //load weather
};

document.addEventListener("DOMContentLoaded", initApp)

const getGeoWeather = (event) => {
    if(event){
        if(event.type === "click"){
            const mapIcon = document.querySelector(".fa-map-marker-alt");
            addSpinner(mapIcon);
        }
    }
    /*if(!navigator.geolocation) return GeolocationPositionError();
    navigator.geoloocation.getCurrentPosition(geoSuccess, geoError);*/
}