const apiKey = "50b3da3e41mshf0ae18a31265472p1f05fbjsn862e50bd6757";
const apiHost = "open-weather13.p.rapidapi.com";

const searchBox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
  const url = `https://${apiHost}/city/${city}/EN`; // Construct the full URL including the city

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": apiHost,
    },
  };

  try {
    const response = await fetch(url, options);

    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      const result = await response.json();
      // console.log(result);

      const tempFahrenheit = result.main.temp;
      const tempCelsius = (tempFahrenheit - 32) * (5 / 9);

      document.querySelector(".city").innerHTML = result.name;
      document.querySelector(".temp").innerHTML =
        Math.floor(tempCelsius) + "<sup>o</sup>C";
      document.querySelector(".humidity").innerHTML =
        result.main.humidity + " %";
      document.querySelector(".wind").innerHTML = result.wind.speed + " Km/h";

      if (result.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (result.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (result.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (result.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (result.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    // console.error(error);
  }
}

searchbtn.addEventListener("click", () => {
  getWeather(searchBox.value);
});

const apiUrl = "https://open-weather13.p.rapidapi.com/city/landon/EN"; // This is the API URL
// const apiKey = "50b3da3e41mshf0ae18a31265472p1f05fbjsn862e50bd6757"; // This is the API key
