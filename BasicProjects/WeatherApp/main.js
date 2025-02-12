const apiKey = "04e6eadefb196fce9bf51eb29f053749";
const searchWeatherBtn = document.getElementById("searchButton");
const weatherTextbox = document.getElementById("cityNameText");
const cityNameTxtObj = document.getElementById("cityNameTxt");
const tempTxtObj = document.getElementById("tempTxt");
const weatherIconObj = document.getElementById("weatherIcon");
const feelsLikeTxtObj = document.getElementById("feelsLikeTxt");
const windTxtObj = document.getElementById("windTxt");
const humudityTxtObj = document.getElementById("humudityTxt");
const locationBtn = document.getElementById("useLocationButton");

searchWeatherBtn.addEventListener("click", () => { getWeather(); });
locationBtn.addEventListener("click", () => { getWeatherByLocation(); });

function getWeather() {
    let city = weatherTextbox.value;

    if (city == "") {
        alert("Please Enter a City Name");
    }

    const xhr = new XMLHttpRequest;
    xhr.addEventListener("readystatechange", () => {
        if (xhr.status == 404) {
            alert('City not found');
            return;
        }
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(JSON.parse(xhr.responseText));
            updateInfo(JSON.parse(xhr.responseText));
        }
    })

    xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    xhr.send();
}

function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            const xhr = new XMLHttpRequest;
            xhr.addEventListener("readystatechange", () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(JSON.parse(xhr.responseText));
                    updateInfo(JSON.parse(xhr.responseText));
                }
            })

            xhr.open("GET", url);
            xhr.send();
        }, () => {
            alert('Geolocation not supported or permission denied');
        });
    } else {
        alert('Geolocation not supported by this browser');
    }
}

function updateInfo(weather) {
    cityNameTxtObj.innerHTML = weather.name + ", " + weather.sys.country;
    tempTxtObj.innerHTML = weather.main.temp + "°";

    if (weather.weather[0].id == 801 || weather.weather[0].id == 802 || weather.weather[0].id == 803 || weather.weather[0].id == 804) {
        weatherIconObj.innerHTML = `
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M58.3333 63.3333H30C25.6728 63.3322 21.4313 62.1278 17.7492 59.8549C14.0672 57.5819 11.0897 54.3298 9.14953 50.462C7.20937 46.5942 6.38294 42.2631 6.76261 37.9527C7.14227 33.6423 8.71306 29.5223 11.2995 26.0532C13.8858 22.5842 17.3859 19.9026 21.4086 18.3083C25.4313 16.7139 29.8181 16.2695 34.0788 17.0248C38.3395 17.7801 42.3062 19.7053 45.5357 22.5853C48.7653 25.4653 51.1303 29.1866 52.3666 33.3333H58.3333C62.3115 33.3333 66.1269 34.9137 68.9399 37.7267C71.7529 40.5397 73.3333 44.3551 73.3333 48.3333C73.3333 52.3115 71.7529 56.1269 68.9399 58.9399C66.1269 61.7529 62.3115 63.3333 58.3333 63.3333Z" stroke="white" stroke-width="6.66667" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `;
    }
    else if (weather.weather[0].id == 800) {
        weatherIconObj.innerHTML = `
        <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M32.87 42.6667C38.7611 42.6667 43.5367 37.8911 43.5367 32C43.5367 26.109 38.7611 21.3334 32.87 21.3334C26.979 21.3334 22.2034 26.109 22.2034 32C22.2034 37.8911 26.979 42.6667 32.87 42.6667Z"
                        stroke="white" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M32.8701 5.33337V10.6667" stroke="white" stroke-width="5.33333" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M32.8701 53.3334V58.6667" stroke="white" stroke-width="5.33333" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M14.0168 13.1466L17.7768 16.9066" stroke="white" stroke-width="5.33333"
                        stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M47.9634 47.0934L51.7234 50.8534" stroke="white" stroke-width="5.33333"
                        stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6.20337 32H11.5367" stroke="white" stroke-width="5.33333" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M54.2034 32H59.5367" stroke="white" stroke-width="5.33333" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M17.7768 47.0934L14.0168 50.8534" stroke="white" stroke-width="5.33333"
                        stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M51.7234 13.1466L47.9634 16.9066" stroke="white" stroke-width="5.33333"
                        stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        `;
    }
    else if (weather.weather[0].id == 701 || weather.weather[0].id == 711 || weather.weather[0].id == 721 || weather.weather[0].id == 731 || weather.weather[0].id == 741 || weather.weather[0].id == 751 || weather.weather[0].id == 761 || weather.weather[0].id == 762 || weather.weather[0].id == 771 || weather.weather[0].id == 781) {
        weatherIconObj.innerHTML = `
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M59.0001 25.6666C59.9758 24.7271 61.1657 24.0397 62.467 23.6637C63.7682 23.2877 65.1415 23.2346 66.4679 23.5089C67.7942 23.7832 69.0338 24.3767 70.0791 25.2379C71.1245 26.0992 71.9442 27.2023 72.4672 28.4517C72.9902 29.7011 73.2008 31.0592 73.0807 32.4083C72.9606 33.7574 72.5135 35.057 71.7781 36.1944C71.0426 37.3318 70.041 38.2727 68.86 38.9359C67.6789 39.599 66.3541 39.9642 65.0001 39.9999H6.66675" stroke="#D1D5DB" stroke-width="6.66667" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M32.0001 15.3333C32.7723 14.5457 33.728 13.962 34.7813 13.6345C35.8347 13.307 36.9529 13.2461 38.0356 13.4571C39.1183 13.6681 40.1317 14.1444 40.9851 14.8435C41.8384 15.5425 42.5049 16.4423 42.9249 17.4623C43.3449 18.4823 43.5052 19.5906 43.3915 20.6878C43.2778 21.785 42.8937 22.8369 42.2735 23.7491C41.6532 24.6613 40.8164 25.4053 39.8378 25.9145C38.8593 26.4237 37.7697 26.6822 36.6667 26.6667H6.66675" stroke="#D1D5DB" stroke-width="6.66667" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M42.0001 64.6666C42.7723 65.4543 43.728 66.038 44.7813 66.3655C45.8347 66.6929 46.9529 66.7539 48.0356 66.5429C49.1183 66.3319 50.1317 65.8555 50.9851 65.1565C51.8384 64.4575 52.5049 63.5576 52.9249 62.5376C53.3449 61.5176 53.5052 60.4094 53.3915 59.3122C53.2779 58.215 52.8937 57.1631 52.2735 56.2509C51.6532 55.3387 50.8164 54.5946 49.8378 54.0854C48.8593 53.5762 47.7697 53.3178 46.6667 53.3333H6.66675" stroke="#D1D5DB" stroke-width="6.66667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    }
    else if (weather.weather[0].id == 600 || weather.weather[0].id == 601 || weather.weather[0].id == 602 || weather.weather[0].id == 611 || weather.weather[0].id == 612 || weather.weather[0].id == 613 || weather.weather[0].id == 615 || weather.weather[0].id == 616 || weather.weather[0].id == 620 || weather.weather[0].id == 621 || weather.weather[0].id == 622) {
        weatherIconObj.innerHTML = `
            <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.2966 39.7306C9.31542 37.7064 7.82082 35.2579 6.92607 32.5705C6.03131 29.8831 5.75986 27.0273 6.13227 24.2194C6.50468 21.4116 7.51119 18.7253 9.07556 16.3641C10.6399 14.0028 12.7211 12.0285 15.1615 10.5908C17.6019 9.15301 20.3375 8.28945 23.1611 8.06551C25.9847 7.84158 28.8222 8.26314 31.4587 9.29827C34.0952 10.3334 36.4616 11.9549 38.3786 14.0401C40.2956 16.1252 41.713 18.6193 42.5233 21.3333H47.2966C49.8713 21.333 52.3779 22.1608 54.4459 23.6945C56.514 25.2281 58.034 27.3863 58.7814 29.8501C59.5287 32.314 59.4638 34.9529 58.5962 37.377C57.7286 39.8011 56.1043 41.8819 53.9633 43.312" stroke="white" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M43.2966 37.3334V53.3334" stroke="white" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21.9631 37.3334V53.3334" stroke="white" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M32.6299 42.6666V58.6666" stroke="white" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    }
    else if (weather.weather[0].id == 500 || weather.weather[0].id == 501 || weather.weather[0].id == 502 || weather.weather[0].id == 503 || weather.weather[0].id == 504 || weather.weather[0].id == 511 || weather.weather[0].id == 520 || weather.weather[0].id == 521 || weather.weather[0].id == 522 || weather.weather[0].id == 531 || weather.weather[0].id == 300 || weather.weather[0].id == 301 || weather.weather[0].id == 302 || weather.weather[0].id == 310 || weather.weather[0].id == 311 || weather.weather[0].id == 312 || weather.weather[0].id == 313 || weather.weather[0].id == 314 || weather.weather[0].id == 321 || weather.weather[0].id == 200 || weather.weather[0].id == 201 || weather.weather[0].id == 202 || weather.weather[0].id == 210 || weather.weather[0].id == 211 || weather.weather[0].id == 212 || weather.weather[0].id == 221 || weather.weather[0].id == 230 || weather.weather[0].id == 231 || weather.weather[0].id == 232) {
        weatherIconObj.innerHTML = `
            <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.2966 39.7306C9.31542 37.7064 7.82082 35.2579 6.92607 32.5705C6.03131 29.8831 5.75986 27.0273 6.13227 24.2194C6.50468 21.4116 7.51119 18.7253 9.07556 16.3641C10.6399 14.0028 12.7211 12.0285 15.1615 10.5908C17.6019 9.15301 20.3375 8.28945 23.1611 8.06551C25.9847 7.84158 28.8222 8.26314 31.4587 9.29827C34.0952 10.3334 36.4616 11.9549 38.3786 14.0401C40.2956 16.1252 41.713 18.6193 42.5233 21.3333H47.2966C49.8713 21.333 52.3779 22.1608 54.4459 23.6945C56.514 25.2281 58.034 27.3863 58.7814 29.8501C59.5287 32.314 59.4638 34.9529 58.5962 37.377C57.7286 39.8011 56.1043 41.8819 53.9633 43.312" stroke="white" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M43.2966 37.3334V53.3334" stroke="white" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21.9631 37.3334V53.3334" stroke="white" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M32.6299 42.6666V58.6666" stroke="white" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    }

    feelsLikeTxtObj.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
            d="M14 4V14.54C14.7626 14.9803 15.3586 15.6599 15.6955 16.4734C16.0325 17.2869 16.0916 18.1888 15.8637 19.0394C15.6358 19.8899 15.1336 20.6415 14.435 21.1775C13.7365 21.7136 12.8805 22.0041 12 22.0041C11.1195 22.0041 10.2635 21.7136 9.56496 21.1775C8.86638 20.6415 8.3642 19.8899 8.1363 19.0394C7.9084 18.1888 7.96752 17.2869 8.30448 16.4734C8.64145 15.6599 9.23743 14.9803 10 14.54V4C10 3.46957 10.2107 2.96086 10.5858 2.58579C10.9609 2.21071 11.4696 2 12 2C12.5304 2 13.0391 2.21071 13.4142 2.58579C13.7893 2.96086 14 3.46957 14 4Z"
            stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Feels like: ${weather.main.feels_like}°
    `;

    windTxtObj.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
            d="M17.7 7.69998C17.9927 7.41814 18.3497 7.2119 18.7401 7.0991C19.1304 6.98631 19.5424 6.97037 19.9403 7.05266C20.3383 7.13495 20.7101 7.313 21.0237 7.57138C21.3373 7.82976 21.5832 8.16069 21.7401 8.53551C21.897 8.91033 21.9602 9.31775 21.9242 9.72249C21.8882 10.1272 21.754 10.5171 21.5334 10.8583C21.3128 11.1995 21.0123 11.4818 20.658 11.6808C20.3037 11.8797 19.9062 11.9893 19.5 12H2"
            stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path
            d="M9.6 4.60005C9.83168 4.36375 10.1184 4.18864 10.4344 4.0904C10.7504 3.99216 11.0858 3.97387 11.4106 4.03717C11.7355 4.10047 12.0395 4.24338 12.2955 4.45309C12.5515 4.66279 12.7514 4.93275 12.8774 5.23874C13.0034 5.54474 13.0515 5.87723 13.0174 6.20639C12.9833 6.53555 12.8681 6.85111 12.682 7.12477C12.4959 7.39843 12.2449 7.62164 11.9513 7.7744C11.6578 7.92716 11.3309 8.0047 11 8.00005H2"
            stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path
            d="M12.6 19.4C12.8317 19.6362 13.1184 19.8114 13.4344 19.9096C13.7504 20.0078 14.0858 20.0261 14.4106 19.9628C14.7355 19.8995 15.0395 19.7566 15.2955 19.5469C15.5515 19.3372 15.7514 19.0673 15.8774 18.7613C16.0034 18.4553 16.0515 18.1228 16.0174 17.7936C15.9833 17.4645 15.8681 17.1489 15.682 16.8752C15.4959 16.6016 15.2449 16.3784 14.9513 16.2256C14.6578 16.0728 14.3309 15.9953 14 16H2"
            stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Wind: ${weather.wind.speed} km/h
    `;

    humudityTxtObj.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
            d="M7 16.3C9.2 16.3 11 14.47 11 12.25C11 11.09 10.43 9.99005 9.29 9.06005C8.15 8.13005 7.29 6.75005 7 5.30005C6.71 6.75005 5.86 8.14005 4.71 9.06005C3.56 9.98005 3 11.1 3 12.25C3 14.47 4.8 16.3 7 16.3Z"
            stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path
            d="M12.5601 6.60002C13.2478 5.50114 13.7354 4.28906 14.0001 3.02002C14.5001 5.52002 16.0001 7.92002 18.0001 9.52002C20.0001 11.12 21.0001 13.02 21.0001 15.02C21.0058 16.4023 20.601 17.7552 19.8369 18.9071C19.0728 20.059 17.9839 20.9582 16.7082 21.4905C15.4325 22.0229 14.0275 22.1644 12.6713 21.8973C11.315 21.6302 10.0686 20.9664 9.09009 19.99"
            stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Humidity: ${weather.main.humidity}%
    `;
}


