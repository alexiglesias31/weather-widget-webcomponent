function fetchLocationCurrentWeather() {
    const urlweather = "http://dataservice.accuweather.com/currentconditions/v1/";
    const apikey = "227646cd2905b6d573c83c912003f238";
    const lat = 22.788;
    const lon = -80.252;

    let fetchurl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;

    fetch(fetchurl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const img = document.querySelector('.weather_icon');
            img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        });  
}

const form = document.querySelector('form');
form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchLocationCurrentWeather();
});

window.onload = () => {
    navigator.geolocation.getCurrentPosition( 
        (pos) => {console.log(pos);}, 
        (error) => {console.log(error);});
}