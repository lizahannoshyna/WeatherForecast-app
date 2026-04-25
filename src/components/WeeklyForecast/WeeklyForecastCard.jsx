import React from "react";
import styles from "./WeeklyForecastCard.module.css";

const WeeklyForecastCard = ({ dayData }) => {
  if (!dayData) return null;

  const date = new Date(dayData.dt * 1000);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const iconUrl = `https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`;
  const description = dayData.weather[0].description;
  const temp = Math.round(dayData.main.temp);

  return (
    <div className={styles.cardRow}>
      <div className={styles.dateSide}>{formattedDate}</div>

      <div className={styles.conditionSide}>
        <img src={iconUrl} alt={description} className={styles.weatherIcon} />
      </div>

      <div className={styles.humiditySide}>{dayData.main.humidity}%</div>

      <div className={styles.tempSide}>
        <span className={styles.tempMain}>{temp}°C</span>
        <span className={styles.weatherDesc}>{description}</span>
      </div>
    </div>
  );
};

export default WeeklyForecastCard;