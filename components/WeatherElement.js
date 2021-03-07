const mainTemplate = document.createElement('template');
mainTemplate.innerHTML = `
    <link rel="stylesheet" href="./fontawesome-free-5.12.0-web/css/all.min.css">
    <div class="weather_element_container light">
        <div class="weather_element_dark_mode_container">    
            <div class="weather_element_dark_mode_switch">
                <span class="dark_mode"><i class="fa fa-moon"></i></span>
                <span class="light_mode"><i class="fa fa-sun"></i></span>
                <button class="weather_element_dark_mode_button"></button>
            </div>
        </div>
        <div class="weather_element_content">
            <div class="weather_element_weather hidden">
                
            </div>
            <div class="weather_element_preloader hidden">
                <div class="lds-dual-ring"></div>
            </div>
            <div class="weather_element_error hidden">
                <i class="fa fa-times"></i>
                <span>Ooops, we couldn't find any match</span>
            </div>
            <div class="weather_element_welcome visible">
                <i class="fa fa-arrow-down"></i>
                <span>Please select a City</span>
            </div>
        </div>
        <div class="weather_element_input">
            <input type="text" id="weather_element_input_city" name="weather_element_input_city" placeholder="Enter a Location">
        </div>
    </div>
`;



const contentTemplate = document.createElement("template");
contentTemplate.innerHTML = `
    <img src="" alt="WeatherIcon" class="weather_element_weather_icon">
    <p class="weather_element_weather_info"></p>
`;


const styles = document.createElement("styles");
styles.innerHTML = `
    .weather_element_dark_mode_button {
        position: absolute;
    }
`;

export class WeatherElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        const temp = mainTemplate.content.cloneNode((true));
        this.shadowRoot.appendChild(temp);
        this.shadowRoot.innerHTML += '<link rel="stylesheet" href="./style.css">';
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.weather_element_dark_mode_button').addEventListener("click",this.switchDarkMode);
        this.shadowRoot.querySelector('#weather_element_input_city').addEventListener("change", this.getWeatherInfo);
    }

    disconnectedCallback() {

    }

    switchDarkMode() {
        let container = this.getRootNode().querySelector('.weather_element_container');
        container.classList.toggle("dark");
        container.classList.toggle("light");
    }

    static showContainer(rootNode, visibleClass) {
        let mainElement = rootNode.querySelector('.weather_element_content').children;
        for (const cont of mainElement) {
            cont.classList.contains(visibleClass) ? cont.classList.add('visible') : cont.classList.remove('visible');
            cont.classList.contains(visibleClass) ? cont.classList.remove('hidden') : cont.classList.add('hidden');
        }
    }

    static showContent(rootNode, imageSrc, spanContent) {
        const temp = contentTemplate.content.cloneNode((true));
        temp.querySelector('.weather_element_weather_icon').src = imageSrc;
        temp.querySelector('.weather_element_weather_info').innerHTML = spanContent;
        rootNode.querySelector('.weather_element_weather').innerHTML = '';
        rootNode.querySelector('.weather_element_weather').appendChild(temp);
    }

    getWeatherInfo() {
        WeatherElement.showContainer(this.getRootNode(), 'weather_element_preloader');

        const urlweather = "http://dataservice.accuweather.com/currentconditions/v1/";
        const apikey = "227646cd2905b6d573c83c912003f238";
    
        let fetchurl = `http://api.openweathermap.org/data/2.5/weather?q=${this.value}&appid=${apikey}`;
    
        fetch(fetchurl)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let imgSrc = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                let celsius = parseFloat(data.main.temp) - 273.15;
                let spanContent = `${celsius.toFixed(2)}&nbsp;<sup>o</sup>C`;
                WeatherElement.showContent(this.getRootNode(), imgSrc, spanContent);
                WeatherElement.showContainer(this.getRootNode(), 'weather_element_weather');
            })
            .catch(error => {
                WeatherElement.showContainer(this.getRootNode(), 'weather_element_error');
            });
    }
    
}
customElements.define( "weather-element", WeatherElement);