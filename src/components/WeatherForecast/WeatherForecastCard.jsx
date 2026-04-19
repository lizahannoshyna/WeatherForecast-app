import React from 'react';
import { RefreshCcw, Heart, Trash2 } from 'lucide-react';
import styles from './WeatherForecastCard.module.css';

const WeatherForecastCard = ({ data }) => {
  if (!data) return null;

  const { name, sys, main, weather, dt, timezone } = data;
  const country = sys.country;
  const temperature = Math.round(main.temp);
  const weatherDescription = weather[0].description;

  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  const utcDate = new Date(dt * 1000);
  const localDate = new Date((dt + timezone) * 1000);

  const timeString = localDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  });

  const dateString = localDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC'
  });

  const weekdayString = localDate.toLocaleDateString('en-US', {
    weekday: 'long',
    timeZone: 'UTC'
  });

  return (
    <div className={styles.card}>
      <div className={styles.locationHeader}>
        <span>{name}</span>
        <span>{country}</span>
      </div>
      <h2 className={styles.time}>{timeString}</h2>
      <button className={styles.hourlyBtn}>Hourly forecast</button>
      <p className={styles.dateInfo}>
        {dateString} | {weekdayString}
      </p>
      <img
        src={iconUrl}
        alt={weatherDescription}
        className={styles.weatherIcon}
      />
      <h1 className={styles.temperature}>{temperature}°C</h1>
      <div className={styles.actions}>
        <div className={styles.leftActions}>
          <button className={`${styles.iconBtn} ${styles.refreshBtn}`}>
            <RefreshCcw size={18} strokeWidth={2} />
          </button>
          <button className={`${styles.iconBtn} ${styles.heartBtn}`}>
            <Heart size={18} strokeWidth={2} />
          </button>
        </div>

        <button className={styles.seeMoreBtn}>See more</button>

        <button className={`${styles.iconBtn} ${styles.trashBtn}`}>
          <Trash2 size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default WeatherForecastCard;