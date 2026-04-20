import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { getByCity } from "./services/weatherService";
import "./App.css";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast";
import WeatherForecastStats from "./components/WeatherForecastStats/WeatherForecastStats";
import GallerySwiper from "./components/Gallery/GallerySwiper";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import Footer from "./components/Footer/Footer";

function App() {
  const [weatherList, setWeatherList] = useState(() => {
    const saved = localStorage.getItem("weather_app_cards");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedStats, setSelectedStats] = useState(null); 
  const [selectedHourly, setSelectedHourly] = useState(null);

  useEffect(() => {
    localStorage.setItem("weather_app_cards", JSON.stringify(weatherList));
  }, [weatherList]);

const handleSearch = async (city) => {
  try {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 
    const currentData = await getByCity(city);
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    
    if (!forecastResponse.ok) throw new Error("Forecast failed");
    const forecastData = await forecastResponse.json();

    const fullData = {
      ...currentData,
      list: forecastData.list 
    };

    setWeatherList((prev) => [...prev, fullData]);
  } catch (error) {
    console.error("Помилка пошуку:", error);
  }
};

  const handleSeeMore = (cardData) => {
    setSelectedStats(cardData);
    scrollToDetail();
  };

const handleHourlyClick = (cardData) => {
  console.log("Дані картки:", cardData);
  setSelectedHourly(cardData);
  scrollToDetail();
};

  const scrollToDetail = () => {
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Hero onSearch={handleSearch} />

      <WeatherForecast
        weatherList={weatherList}
        onSeeMore={handleSeeMore}
        onHourlyClick={handleHourlyClick}
        onDelete={(id) => setWeatherList(prev => prev.filter(item => item.id !== id))}
        onFavorite={(id) => console.log("Favorite:", id)}
        onRefresh={(city) => console.log("Refresh:", city)}
      />

      {selectedStats && (
        <div className="detail-section">
           <WeatherForecastStats weatherData={selectedStats} />
           <button className="close-btn" onClick={() => setSelectedStats(null)}>Close Stats</button>
        </div>
      )}

      {selectedHourly && (
  <div className="detail-section">
    <div className="container">
      <h2 className="section-title">Hourly Forecast for {selectedHourly.name}</h2>
      <HourlyForecast hourlyData={selectedHourly.list || selectedHourly.hourly} />
      <button className="close-btn" onClick={() => setSelectedHourly(null)}>Close Chart</button>
    </div>
  </div>
)}
      <GallerySwiper />
      <Footer />
    </ThemeProvider>
  );
}

export default App;