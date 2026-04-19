import React from "react";
import WeatherForecastCard from "./WeatherForecastCard";
import Container from "../Container";
import css from "./WeatherForecast.module.css";

const WeatherForecast = ({ weatherList }) => {
  if (!weatherList || weatherList.length === 0) {
    return (
      <div className="text-center text-white/70 py-10">
        Search for a city to see the weather.
      </div>
    );
  }

  return (
    <Container>
      <div className={css.gridContainer}>
        {weatherList.map((cityData) => (
          <WeatherForecastCard key={cityData.id} data={cityData} />
        ))}
      </div>
    </Container>
  );
};

export default WeatherForecast;
