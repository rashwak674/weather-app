export const setReplacedText = () => {
    const input = document.getElementById("searchBar_text"); 
    window.innerWidth < 400 
    ? (input.placeholder = "City, State, Country")
    : (input.placeholder = "City, State, Country, or Zip Code"); 
};
export const spin = (element) => {
    animateButton(element);
    setTimeout(animateButton, 1000, element);

}; 

const animateButton = (element) => {
    element.classList.toggle("none");
    element.nextElementSibling.classList.toggle("block");
    element.nextElementSibling.classList.toggle("none");
};

export const displayError = (headerMsg, srMsg) => {
    updateWeather(headerMsg);
    updateConfirmation(srMsg);
}; 

export const displayApiError = (statusCode) => {
    const propMessage = toProperCase(statusCode.message); 
    updateWeather(propMessage); 
    updateConfirmation(`${propMessage}. Please try again!`);
};

const correctCase = (text) => {
    const words = text.split(" ");
    const correctWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return correctWords.join(" ");
};

const updateWeather = (message) => {
    const h1 = document.getElementById("currentWeather_location");
    h1.textContent = message;
};

export const updateConfirmation = (message) => {
    document.getElementById("confirmation").textContent =message;
};

export const updateDisplay = (wJson, locObj) => {
    fadeDisplay(); 
    clearDisplay(); 
    const wClass = getWClass(wJson.current.weather[0].icon); 
    setBGImage(wClass);
    const screenReaderW = buildSRW(wJson, locObj);  

    fadeDisplay();
}; 

const fadeDisplay = () => {
    const cc = document.getElementById("currentWeather"); 
    cc.classList.toggle("zero-vis");
    cc.classList.toggle("fade-in"); 
    const weekly = document.getElementById("dailyForecast"); 
    weekly.classList.toggle("zero-vis");
    weekly.classList.toggle("fade-in");
};

const clearDisplay = () => {
    const currentConditions = document.getElementById("currentWeather_conditions"); 
    deleteContents(currentConditions); 
    const weeklyForecast = document.getElementById("dailyForecast_content"); 
    deleteContents(weeklyForecast); 
}; 

const deleteContents = (parentElement) => {
    let child = parentElement.lastElementChild; 
    while(child){
        parentElement.removeChild(child); 
        child = parentElement.lastElementChild; 
    }
}; 

const getWClass = (icon) => {
    const firstTwoChars = icon.slice(0, 2); 
    const lastChar = icon.slice(2); 
    const wLookup = {
        "09": "snow", 
        10: "rain", 
        11: "rain", 
        13: "snow",
        50: "fog"
    }; 
    let wClass; 
    if(wLookup[firstTwoChars]){
        wClass = wLookup[firstTwoChars]; 
    }
    else if (lastChar === "d"){
        wClass = "clouds"; 
    } else {
        wClass = "night"; 
    }
    return wClass; 
};

const setBGImage = (wClass) => {
    document.documentElement.classList.add(wClass); 
    document.documentElement.classList.forEach(img => {
        if(img !== wClass){
            document.documentElement.classList.remove(img); 
        }
    }); 
};

const buildSRW = (wJson, locObj) => {
    const loc = locObj.getName(); 
    const measUnit = locObj.getMeasUnit(); 
    const tempUnit = unit === "imperial" ? "F" : "C"; 
    return `${wJson.current.weather[0].description} and ${Math.round(Nuumber(wJson.current.temp))}`
};