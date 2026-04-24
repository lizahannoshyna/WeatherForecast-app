import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { getByCity } from "./services/weatherService";
import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast";
import WeatherForecastStats from "./components/WeatherForecastStats/WeatherForecastStats";
import GallerySwiper from "./components/Gallery/GallerySwiper";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";
import Footer from "./components/Footer/Footer";

function App() {
  const [weatherList, setWeatherList] = useState(() => {
    const saved = localStorage.getItem("weather_app_cards");
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(false);

  const [selectedStats, setSelectedStats] = useState(null);
  const [selectedHourly, setSelectedHourly] = useState(null);
  const [selectedWeekly, setSelectedWeekly] = useState(null);

  useEffect(() => {
    localStorage.setItem("weather_app_cards", JSON.stringify(weatherList));
  }, [weatherList]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (city) => {
    if (!city.trim() || city.trim().length < 2) {
      toast.error("Введіть назву міста (мінімум 2 символи)");
      return;
    }

    const isDuplicate = weatherList.some(
      (w) => w.name.toLowerCase() === city.trim().toLowerCase(),
    );
    if (isDuplicate) {
      toast.warning("Це місто вже у списку! 📍");
      return;
    }

    setLoading(true);
    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const currentData = await getByCity(city);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`,
      );

      if (!forecastResponse.ok) throw new Error("Forecast failed");
      const forecastData = await forecastResponse.json();

      const fullData = {
        ...currentData,
        list: forecastData.list,
      };

      setWeatherList((prev) => [...prev, fullData]);
      toast.success(`Місто ${city} додано!`);
    } catch (error) {
      toast.error(`❌ Місто "${city}" не знайдено.`);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = (id) => {
    const isFav = favorites.includes(id);

    if (isFav) {
      toast.info("Видалено з обраного");
    } else {
      toast.success("Додано в обране! ❤️");
    }

    setFavorites((prev) =>
      isFav ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  };

  const handleRefresh = async (city) => {
    const index = weatherList.findIndex((w) => w.name === city);
    if (index === -1) return;

    try {
      toast.info(`Оновлення ${city}...`);
      const updatedCurrent = await getByCity(city);
      setWeatherList((prev) => {
        const newList = [...prev];
        newList[index] = { ...newList[index], ...updatedCurrent };
        return newList;
      });
      toast.success("Дані оновлено!");
    } catch (error) {
      toast.error("Не вдалось оновити дані");
    }
  };

  const handleDelete = (id) => {
    setWeatherList((prev) => prev.filter((item) => item.id !== id));

    if (selectedStats?.id === id) setSelectedStats(null);
    if (selectedHourly?.id === id) setSelectedHourly(null);
    if (selectedWeekly?.id === id) setSelectedWeekly(null);

    toast.error("Картку видалено");
  };

  const handleSeeMore = (data) => {
    setSelectedStats(data);
    scrollToDetail();
  };

  const handleForecastClick = (data, mode) => {
    if (mode === "hourly") {
      setSelectedHourly(data);
    } else if (mode === "weekly") {
      setSelectedWeekly(data);
    }
    scrollToDetail();
  };

  const scrollToDetail = () => {
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 200);
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <Header />
      <Hero onSearch={handleSearch} />

      {loading && <div className="loader-overlay">⏳ Завантаження...</div>}

      <WeatherForecast
        weatherList={weatherList}
        favorites={favorites}
        onSeeMore={handleSeeMore}
        onHourlyClick={(data, mode) => handleForecastClick(data, mode)}
        onDelete={handleDelete}
        onFavorite={handleFavorite}
        onRefresh={handleRefresh}
      />

      {selectedStats && (
        <div className="detail-section">
          <div className="container">
            <WeatherForecastStats weatherData={selectedStats} />
            <button
              className="close-btn"
              onClick={() => setSelectedStats(null)}
            >
              Close Stats
            </button>
          </div>
        </div>
      )}

      {selectedHourly && (
        <div className="detail-section">
          <div className="container">
            <h2 className="section-title">
              Hourly Forecast for {selectedHourly.name}
            </h2>
            <HourlyForecast hourlyData={selectedHourly.list} />
            <button
              className="close-btn"
              onClick={() => setSelectedHourly(null)}
            >
              Close Hourly
            </button>
          </div>
        </div>
      )}

      {selectedWeekly && (
        <div className="detail-section">
          <div className="container">
            <h2 className="section-title">
              Weekly Outlook for {selectedWeekly.name}
            </h2>
            <WeeklyForecast data={selectedWeekly.list} />
            <button
              className="close-btn"
              onClick={() => setSelectedWeekly(null)}
            >
              Close Weekly
            </button>
          </div>
        </div>
      )}

      <GallerySwiper weatherList={weatherList} />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
