import React from "react";
import WeatherForecastCard from "./WeatherForecastCard";
import Container from "../Container";
import styles from "./WeatherForecast.module.css";

const WeatherForecast = ({
  weatherList,
  favorites,
  onSeeMore,
  onHourlyClick,
  onDelete,
  onFavorite,
  onRefresh,
}) => {
  return (
    <Container>
      <div className={styles.weatherWrp}>
        {weatherList.map((data) => (
          <WeatherForecastCard
            key={data.id}
            data={data}
            favorites={favorites}
            onSeeMore={onSeeMore}
            onHourlyClick={onHourlyClick}
            onDelete={onDelete}
            onFavorite={onFavorite}
            onRefresh={onRefresh}
          />
        ))}
      </div>
    </Container>
  );
};

export default WeatherForecast;
