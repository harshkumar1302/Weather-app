const apiKey = "2af18b5e7fc5a434426aa9c74b84763e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search-section input");
const searchBtn = document.querySelector(".search-section button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(cityName) {
    try {
        const response = await fetch(`${apiUrl}${cityName}&appid=${apiKey}`);

        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather-details").style.display = "none";
        } else {

            const data = await response.json();
            console.log(data);

            document.querySelector(".city-name").innerHTML = `${data.name}`;
            document.querySelector(".temperature").innerHTML = `${Math.round(data.main.temp)} °C`;
            document.querySelector(".humidity-measure").innerHTML = `${data.main.humidity}%`;
            document.querySelector(".wind-speed-measure").innerHTML = `${data.wind.speed}km/hr`;
            document.querySelector(".weather-details").style.display = "block";
            document.querySelector(".error").style.display = "none";

            if (weatherIcon) {
                if (data.weather[0].main == "Clouds") {
                    weatherIcon.src = "./assets/clouds.png";
                } else if (data.weather[0].main == "Clear") {
                    weatherIcon.src = "./assets/clear.png";
                } else if (data.weather[0].main == "Rain") {
                    weatherIcon.src = "./assets/rain.png";
                } else if (data.weather[0].main == "Drizzle") {
                    weatherIcon.src = "./assets/drizzle.png";
                } else if (data.weather[0].main == "Mist") {
                    weatherIcon.src = "./assets/mist.png";
                }
            } else {
                console.error("Weather icon element not found");
            }

        }



    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
