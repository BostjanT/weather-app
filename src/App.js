import React, { useState } from "react";

function App() {
  const WEATHER_API_KEY = "5f06ad5320f1f04229c2dd34664ec877";
  const base = "https://api.openweathermap.org/data/2.5/";

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${base}weather?q=${query}&units=metric&APPID=${WEATHER_API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
          setQuery("");
          console.log(data);
        });
    }
  };

  const dateBuild = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 15
            ? "weather-container"
            : "weather-container cold"
          : "weather-container"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter city..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuild(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather-icon">
                <img
                  src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                />
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
