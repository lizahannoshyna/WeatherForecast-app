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
      style={{ "--bg-url": `url(${heroBg})` }}
    >
      <Container>
        <h1 className={`${css.heroTitle} animate__animated animate__fadeIn`}>
          Weather dashboard
        </h1>
        <div className={css.heroContent}>
          <p
            className={`${css.leftText} animate__animated animate__bounceInLeft`}
          >
            Create your personal list of <br /> favorite cities and always be{" "}
            <br /> aware of the weather.
          </p>

          <div
            className={`${css.divider} animate__animated animate__bounceInUp`}
          ></div>

          <div
            className={`${css.date} animate__animated animate__bounceInRight`}
          >
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
