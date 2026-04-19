import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast";
import { getByCity } from "./services/weatherService";
import News from "./components/News/News";
import GallerySwiper from "./components/Gallery/GallerySwiper";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const [weatherList, setWeatherList] = useState(() => {
    const saved = localStorage.getItem("weather_app_cards");
    return saved ? JSON.parse(saved) : [];
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("weather_app_cards", JSON.stringify(weatherList));
  }, [weatherList]);

  const handleSearch = async (city) => {
    try {
      const data = await getByCity(city);
      setWeatherList((prev) => [...prev, data]);
    } catch (error) {
      console.error("Помилка погоди:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Hero onSearch={handleSearch} />
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <WeatherForecast weatherList={weatherList} />
      {/* <News/> */}
      <GallerySwiper />
      <Footer/>
    </ThemeProvider>
  );
}

export default App;
