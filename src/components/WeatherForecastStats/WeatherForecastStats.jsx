import React from "react";
import {
  Thermometer,
  Droplets, // Замінив CloudRain на Droplets для Humidity
  Wind,
  Eye,
  Gauge,
  ArrowUpDown, // Замінив ArrowUpCircle на ArrowUpDown для Min/Max
} from "lucide-react";
import css from "./WeatherForecastStats.module.css";
import Container from "../Container";

const WeatherForecastStats = ({ weatherData }) => {
  if (!weatherData) return null;

  const { main, wind, visibility } = weatherData;

  const stats = [
    {
      title: "FEELS LIKE",
      value: `${Math.round(main.feels_like)}°`,
      icon: <Thermometer size={20} />,
      type: "orange",
    },
    {
      title: "MIN / MAX",
      value: `${Math.round(main.temp_min)}° / ${Math.round(main.temp_max)}°`,
      icon: <ArrowUpDown size={20} />,
      type: "yellow",
    },
    {
      title: "HUMIDITY",
      value: `${main.humidity}%`,
      icon: <Droplets size={20} />,
      type: "blue",
    },
    {
      title: "PRESSURE",
      value: `${main.pressure} hPa`,
      icon: <Gauge size={20} />,
      type: "red",
    },
    {
      title: "WIND SPEED",
      value: `${wind.speed} km/h`,
      icon: <Wind size={20} />,
      type: "indigo",
    },
    {
      title: "VISIBILITY",
      value: visibility >= 10000 ? "10 km" : `${(visibility / 1000).toFixed(0)} km`,
      icon: <Eye size={20} />,
      type: "gold",
    },
  ];

  return (
    <section className={css.statsSection}>
      <Container>
        <div className={css.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={css.statCard}>
              <div className={`${css.iconWrapper} ${css[stat.type]}`}>
                {stat.icon}
              </div>
              <p className={css.statTitle}>{stat.title}</p>
              <p className={css.statValue}>{stat.value}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WeatherForecastStats;