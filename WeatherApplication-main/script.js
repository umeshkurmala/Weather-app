const apiKey = "513a3b38088b0abfaf4e54375f5b4ebd";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("city");
const searchBtn = document.querySelector("button");
const weatherIcon = document.getElementById("weather-icon");
const tempDiv = document.getElementById("temp-div");
const weatherInfo = document.getElementById("weather-info");

async function getWeather() {
  const city = searchBox.value;

  if (!city) {
    alert("Please enter a city.");
    return;
  }

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    weatherInfo.innerHTML = "<p>City not found. Try again.</p>";
    tempDiv.innerHTML = "";
    weatherIcon.style.display = "none";
  } else {
    const data = await response.json();

    tempDiv.innerHTML = `<p>${Math.round(data.main.temp)}°C</p>`;
    weatherInfo.innerHTML = `<p>${data.name}</p><p>${data.weather[0].description}</p>`;

    const weatherCondition = data.weather[0].main.toLowerCase();
    if (weatherCondition.includes("cloud")) {
      weatherIcon.src = "cloud.png";
    } else if (weatherCondition.includes("clear")) {
      weatherIcon.src = "clear.png";
    } else if (weatherCondition.includes("rain")) {
      weatherIcon.src = "rain.png";
    } else if (weatherCondition.includes("drizzle")) {
      weatherIcon.src = "drizzle.png";
    } else if (weatherCondition.includes("mist")) {
      weatherIcon.src = "mist.png";
    } else {
      weatherIcon.src = "default.png"; // Default fallback image
    }

    weatherIcon.style.display = "block";
  }
}

// Event listener for the button
searchBtn.addEventListener("click", getWeather);
