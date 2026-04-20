import React from 'react';
import WeatherForecastCard from './WeatherForecastCard';
import styles from './WeatherForecast.module.css';

const WeatherForecast = ({ 
  weatherList, 
  onSeeMore, 
  onHourlyClick, 
  onDelete, 
  onFavorite, 
  onRefresh 
}) => {
  return (
    <section className={styles.list}>
      {weatherList && weatherList.map((data) => (
        <WeatherForecastCard
          key={data.id}
          data={data}
          onSeeMore={onSeeMore}
          onHourlyClick={onHourlyClick}
          onDelete={onDelete}
          onFavorite={onFavorite}
          onRefresh={onRefresh}
        />
      ))}
    </section>
  );
};

export default WeatherForecast;