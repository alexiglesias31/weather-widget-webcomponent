function getLocationId(cityName) {
    const urlweather = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const apikey = "fNvcDLoxpVmEvfYDxvAL2QTIFWuz88Wg";

    let fetchurl = `${urlweather}?apikey=${apikey}&q=${cityName}`;

    fetch(fetchurl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const locationTitle = document.querySelector('.locationTitle');
            locationTitle.textContent = `${data[0].LocalizedName}, 
            ${data[0].AdministrativeArea.LocalizedName}, ${data[0].Country.LocalizedName}`;
            fetchLocationCurrentWeather(data[0].Key);
        });
}

function fetchLocationInfo() {
    const urlweather = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search";
    const apikey = "fNvcDLoxpVmEvfYDxvAL2QTIFWuz88Wg";

    const latitude = 22.788;
    const longitude = -80.252;

    let fetchurl = `${urlweather}?apikey=${apikey}&q=${latitude},${longitude}`;

    fetch(fetchurl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const locationTitle = document.querySelector('.locationTitle');
            locationTitle.textContent = data.LocalizedName;
            fetchLocationCurrentWeather(data.Key);
        });
}

function fetchLocationCurrentWeather(locationId) {
    const urlweather = "http://dataservice.accuweather.com/currentconditions/v1/";
    const apikey = "fNvcDLoxpVmEvfYDxvAL2QTIFWuz88Wg";

    let fetchurl = `${urlweather}${locationId}?apikey=${apikey}`;

    fetch(fetchurl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const weatherInfo = document.querySelector('.weatherInfo');
            weatherInfo.textContent = `Temperature: ${data[0].Temperature['Metric'].Value} C`;
            const weatherIcon = document.querySelector('.weather_icon');
            weatherIcon.src = `./icons/${data[0].WeatherIcon}-s.png`;
        });   
}

const form = document.querySelector('form');
form.addEventListener("submit", (e) => {
    e.preventDefault();
    getLocationId(form.querySelector('#city_name').value);
});

// window.addEventListener("load", () => {
//     fetchLocationInfo();
// })