import React from 'react';
import Container from '../Container';
import WeeklyForecastCard from './WeeklyForecastCard';
import styles from './WeeklyForecast.module.css';

const WeeklyForecast = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    return <div className={styles.loader}>Loading weekly forecast...</div>;
  }

  const dailyData = data.filter((reading) => reading.dt_txt.includes("12:00:00"));

  return (
    <Container>
      <div className={styles.forecastWrapper}>
        <h3 className={styles.mainTitle}>Weekly forecast</h3>

        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <span className={styles.headDay}>Day</span>
            <span className={styles.headCondition}>Condition</span>
            <span className={styles.headHumidity}>Hum.</span>
            <span className={styles.headTemp}>Temp</span>
          </div>

          <div className={styles.list}>
            {dailyData.map((day) => (
              <WeeklyForecastCard key={day.dt} dayData={day} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WeeklyForecast;