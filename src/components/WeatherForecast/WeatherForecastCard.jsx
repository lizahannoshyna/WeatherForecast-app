import React from "react";
import { RefreshCcw, Heart, Trash2 } from "lucide-react";
import styles from "./WeatherForecastCard.module.css";

const WeatherForecastCard = ({
  data,
  onSeeMore,
  onHourlyClick,
  onDelete,
  onFavorite,
  onRefresh,
}) => {
  if (!data) return null;

  const { name, sys, main, weather, dt, timezone } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  return (
    <div className={styles.card}>
      <div className={styles.locationHeader}>
        <span>{name}</span>
        <span>{sys.country}</span>
      </div>

      <h2 className={styles.time}>
        {new Date((dt + timezone) * 1000).getUTCHours()}:
        {String(new Date((dt + timezone) * 1000).getUTCMinutes()).padStart(
          2,
          "0",
        )}
      </h2>

      <button className={styles.hourlyBtn} onClick={() => onHourlyClick(data)}>
        Hourly forecast
      </button>

      <p className={styles.dateInfo}>
        {new Date((dt + timezone) * 1000).toLocaleDateString("en-US", {
          weekday: "long",
        })}
      </p>

      <img src={iconUrl} alt="weather icon" className={styles.weatherIcon} />
      <h1 className={styles.temperature}>{Math.round(main.temp)}°C</h1>

      <div className={styles.actions}>
        <div className={styles.leftActions}>
          <button onClick={() => onRefresh(name)} className={styles.iconBtn}>
            <RefreshCcw size={18} />
          </button>
          <button
            onClick={() => onFavorite(data.id)}
            className={styles.iconBtn}
          >
            <Heart size={18} />
          </button>
        </div>
        <button onClick={() => onSeeMore(data)} className={styles.seeMoreBtn}>
          See more
        </button>
        <button onClick={() => onDelete(data.id)} className={styles.iconBtn}>
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default WeatherForecastCard;
