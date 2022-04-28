import React, { useState } from "react";
import "./App.css";
const api = {
  key: "e246b7e6b7e47ff6a859d98e64aa2409",
  base: "https://api.openweathermap.org/data/2.5/",
};
const dateBuilder = (date) => {
  return String(date).slice(0, 15);
};
export default function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((response) => response.json())
        .then((data) => {
          setQuery("");
          setWeather(data);
          console.log(data);
        });
    }
  };
  return (
    <div className={weather.main?.temp > 20 ? "container warm" : "container"}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          ></input>
        </div>
        <div className="location-box">
          <div className="location">
            {weather.name ?? ""} {weather.sys?.country ?? ""}
          </div>
          <div className="date">
            {weather.main ? dateBuilder(new Date()) : ""}
          </div>
        </div>
        <div className="weather-box">
          <div className={`temp ${weather.message ? "smallsize" : ""}`}>
            {weather.main
              ? `${Math.round(weather.main?.temp)}C`
              : weather.message}
          </div>
          <div className="weather">
            {weather.main ? weather.weather[0].main : ""}
          </div>
        </div>
      </main>
    </div>
  );
}
