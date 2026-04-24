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

      <div className={styles.iconSide}>
        <img src={iconUrl} alt={description} className={styles.smallIcon} />
      </div>

      <div className={styles.tempSide}>{temp}°C</div>

      <div className={styles.descSide}>{description}</div>
    </div>
  );
};

export default WeeklyForecastCard;
