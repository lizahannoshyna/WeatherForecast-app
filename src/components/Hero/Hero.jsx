import React, { useState } from "react";
import Container from "../Container";
import SearchBar from "./SearchBar";
import heroBg from "../../assets/img/hero-bg.png";
import css from "./Hero.module.css";

const Hero = ({ onSearch }) => {
  const today = new Date();
  const monthYear = today.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const weekday = today.toLocaleDateString("en-US", { weekday: "long" });
  const dayNumber = today.getDate();

  return (
    <section
      className={css.heroSection}
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <Container>
        <h1 className={css.heroTitle}>Weather dashboard</h1>
        <div className={css.heroContent}>
          <p>
            Create your personal list of favorite cities and always be aware of
            the weather.
          </p>
          <div className={css.divider}></div>
          <div className={css.date}>
            <p className={css.monthYear}>{monthYear}</p>
            <p className={css.dayInfo}>
              {weekday}, {dayNumber}
              <sup>th</sup>
            </p>
          </div>
        </div>
        <div className={css.SearchBarSeaction}>
          <SearchBar onSearch={onSearch} />
        </div>
      </Container>
    </section>
  );
};

export default Hero;
