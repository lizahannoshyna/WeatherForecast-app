import React from "react";
import css from "./HourlyForecast.module.css";
import Container from "../Container";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
);

const HourlyForecast = ({ hourlyData }) => {
  if (!hourlyData || !Array.isArray(hourlyData)) {
    return (
      <div className={css.noData}>No hourly data available for this city</div>
    );
  }

  const nextHours = hourlyData.slice(0, 8);

  const data = {
    labels: nextHours.map((item) => {
      const date = new Date(item.dt * 1000);
      return `${date.getHours()}:00`;
    }),
    datasets: [
      {
        fill: true,
        label: "Temperature (°C)",
        data: nextHours.map((item) => Math.round(item.main.temp)),
        borderColor: "#ff8e53",
        backgroundColor: "rgba(255, 142, 83, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#ff8e53",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: { callback: (value) => `${value}°C` },
      },
    },
  };

  return (
    <Container>
    <div
      style={{
        height: "350px",
        width: "100%",
        padding: "20px",
        background: "white",
        borderRadius: "20px",
      }}
    >
      <Line data={data} options={options} />
    </div>
    </Container>
  );
};

export default HourlyForecast;
