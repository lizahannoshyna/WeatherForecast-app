import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { getByCity } from "./services/weatherService";
import { useAuth } from "./context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import SignUpModal from "./components/SignUpModal/SignUpModal";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast";
import WeatherForecastStats from "./components/WeatherForecastStats/WeatherForecastStats";
import News from "./components/News/News";
import GallerySwiper from "./components/Gallery/GallerySwiper";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";
import Footer from "./components/Footer/Footer";

function App() {
  const [activeCity, setActiveCity] = useState(() => {
    return localStorage.getItem("active_city_name") || null;
  });
  const [cityPhotos, setCityPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [weatherList, setWeatherList] = useState(() => {
    const saved = localStorage.getItem("weather_app_cards");
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const { user, openModal } = useAuth();
  const [selectedStats, setSelectedStats] = useState(null);
  const [selectedHourly, setSelectedHourly] = useState(null);
  const [selectedWeekly, setSelectedWeekly] = useState(null);

  useEffect(() => {
    localStorage.setItem("weather_app_cards", JSON.stringify(weatherList));
  }, [weatherList]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (activeCity) {
      localStorage.setItem("active_city_name", activeCity);
    }
  }, [activeCity]);

  useEffect(() => {
    const fetchCityPhotos = async () => {
      const query = activeCity || "nature weather city people travel happiness";
      const PIXABAY_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

      if (!PIXABAY_KEY) return;

      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=20`,
        );
        const data = await response.json();

        const formattedPhotos = data.hits.map((img) => ({
          id: img.id,
          src: img.webformatURL,
        }));

        setCityPhotos(formattedPhotos);
      } catch (error) {
        console.error("Error fetching Pixabay photos:", error);
      }
    };

    fetchCityPhotos();
  }, [activeCity]);

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

  const handleSeeMore = (cityData) => {
    if (!user) {
      openModal();
      return;
    }

    setActiveCity(cityData.name);
    setSelectedStats(cityData);
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

  const handleLogout = () => {
    setActiveCity(null);
    setSelectedStats(null);
    localStorage.removeItem("active_city_name");
  };

  const handleDelete = (id) => {
    setWeatherList((prev) => prev.filter((item) => item.id !== id));
    toast.error("Картку видалено");
  };

  const handleFavorite = (id) => {
    if (!user) {
      openModal();
      return;
    }
    const isFav = favorites.includes(id);
    setFavorites((prev) =>
      isFav ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
    isFav
      ? toast.info("Видалено з обраного")
      : toast.success("Додано в обране! ❤️");
  };

  const handleRefresh = async (city) => {
    try {
      const updatedCurrent = await getByCity(city);
      setWeatherList((prev) =>
        prev.map((w) => (w.name === city ? { ...w, ...updatedCurrent } : w)),
      );
      toast.success("Дані оновлено!");
    } catch (error) {
      toast.error("Не вдалось оновити дані");
    }
  };

  const scrollToDetail = () => {
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 300);
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <SignUpModal />

      <Header onOpenAuth={openModal} />

      <Hero onSearch={handleSearch} />

      {loading && <div className="loader-overlay">⏳ Завантаження...</div>}

      <WeatherForecast
        weatherList={weatherList}
        favorites={favorites}
        onSeeMore={handleSeeMore}
        onHourlyClick={handleForecastClick}
        onDelete={handleDelete}
        onFavorite={handleFavorite}
        onRefresh={handleRefresh}
      />

      {selectedStats && (
        <div className="container">
          <div className="detail-section">
            <h2 className="section-title">Stats for {selectedStats.name}</h2>
            <WeatherForecastStats weatherData={selectedStats} />
            <button
              className="close-btn"
              onClick={() => setSelectedStats(null)}
              style={{ marginTop: "20px" }}
            >
              Close Stats
            </button>
          </div>
        </div>
      )}

      <div className="container">
        {selectedHourly && (
          <div className="detail-section">
            <h2 className="section-title">
              Hourly Forecast for {selectedHourly.name}
            </h2>
            <HourlyForecast hourlyData={selectedHourly.list} />
            <button
              className="close-btn"
              onClick={() => setSelectedHourly(null)}
            >
              Close
            </button>
          </div>
        )}

        {selectedWeekly && (
          <div className="detail-section">
            <h2 className="section-title">
              Weekly Outlook for {selectedWeekly.name}
            </h2>
            <WeeklyForecast data={selectedWeekly.list} />
            <button
              className="close-btn"
              onClick={() => setSelectedWeekly(null)}
            >
              Close
            </button>
          </div>
        )}
      </div>

      <News city={activeCity} />

      <GallerySwiper photos={cityPhotos} />

      <Footer />
    </ThemeProvider>
  );
}

export default App;
