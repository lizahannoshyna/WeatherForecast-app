import React from "react";
import { RefreshCcw, Heart, Trash2 } from "lucide-react";
import styles from "./WeatherForecastCard.module.css";

const WeatherForecastCard = ({
  data,
  favorites = [],
  onSeeMore,
  onHourlyClick,
  onDelete,
  onFavorite,
  onRefresh,
}) => {
  if (!data) return null;

  const { name, sys, main, weather, dt, timezone, id } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
  const isFavorite = favorites.includes(id);

  const handleAction = (e, callback, ...args) => {
    e.stopPropagation();
    if (callback) callback(...args);
  };

  const localTime = new Date((dt + timezone) * 1000);

  return (
    <div className={styles.card}>
      <div className={styles.locationHeader}>
        <span className={styles.cityName}>{name}</span>
        <span className={styles.countryName}>{sys.country}</span>
      </div>

      <h2 className={styles.time}>
        {localTime.getUTCHours()}:
        {String(localTime.getUTCMinutes()).padStart(2, "0")}
      </h2>

      <div className={styles.forecastButtons}>
        <button
          className={styles.smallBtn}
          onClick={(e) => handleAction(e, onHourlyClick, data, "hourly")}
        >
          Hourly
        </button>
        <button
          className={styles.smallBtn}
          onClick={(e) => handleAction(e, onHourlyClick, data, "weekly")}
        >
          Weekly
        </button>
      </div>

      <p className={styles.dateInfo}>
        {localTime.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
        <span className={styles.separator}>|</span>
        {localTime.toLocaleDateString("en-US", { weekday: "long" })}
      </p>

      <div className={styles.mainDisplay}>
        <img src={iconUrl} alt="weather icon" className={styles.weatherIcon} />
        <h1 className={styles.temperature}>{Math.round(main.temp)}°C</h1>
      </div>

      <div className={styles.actions}>
        <div className={styles.leftActions}>
          <button
            onClick={(e) => handleAction(e, onRefresh, name)}
            className={styles.iconBtn}
            title="Refresh"
          >
            <RefreshCcw size={18} />
          </button>

          <button
            onClick={(e) => handleAction(e, onFavorite, id)}
            className={styles.iconBtn}
            title="Favorite"
          >
            <Heart
              size={18}
              fill={isFavorite ? "#FF4B4B" : "none"}
              color={isFavorite ? "#FF4B4B" : "currentColor"}
            />
          </button>
        </div>

        <button
          onClick={(e) => handleAction(e, onSeeMore, data)}
          className={styles.seeMoreBtn}
        >
          See more
        </button>

        <button
          onClick={(e) => handleAction(e, onDelete, id)}
          className={styles.deleteBtn}
          title="Delete city"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default WeatherForecastCard;
