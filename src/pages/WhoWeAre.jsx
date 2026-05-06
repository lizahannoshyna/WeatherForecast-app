import React from "react";
import Container from "../components/Container";
import { LuLightbulb, LuGlobe, LuSparkles, LuLeaf } from "react-icons/lu";
import s from "./WhoWeAre.module.css";
import aboutImg from "../assets/img/earth.jpg";
import dashboardImg from "../assets/img/woman.jpg";

export const WhoWeAre = () => {
  return (
    <section className={s.section}>
      <Container>
        <div className={s.wrapper}>
          <div className={s.content}>
            <span className={s.overline}>OUR IDENTITY</span>
            <h1 className={s.title}>
              Atmospheric <br />
              <span>Intelligence.</span>
            </h1>
            <p className={s.description}>
              We don't just predict the weather; we illuminate the intricate
              systems of our planet. Lumina was founded on the principle that
              meteorological data should be as beautiful as it is precise.
            </p>
            <a href="#" className={s.discoverBtn}>
              Discover Our Story
            </a>
          </div>

          <div className={s.imageWrapper}>
            <img
              className={s.styledImage}
              src={aboutImg}
              alt="Atmospheric Intelligence"
            />
            <div className={s.imageOverlayText}>Earth</div>
          </div>
        </div>
        <div className={s.featuresGrid}>
          <div className={`${s.featureCard} ${s.card1}`}>
            <div className={s.iconWrapper}>
              <LuLightbulb size={24} />
            </div>
            <h3 className={s.featureTitle}>Visionary Forecasts</h3>
            <p className={s.featureText}>
              Harnessing advanced spectral analysis to provide clarity in an
              increasingly unpredictable climate landscape.
            </p>
          </div>

          <div className={`${s.featureCard} ${s.card2}`}>
            <div
              className={s.iconWrapper}
              style={{ background: "transparent" }}
            >
              <LuSparkles size={24} color="#ccc" />
            </div>
            <h3 className={s.featureTitle}>Real-time Clarity</h3>
            <p className={s.featureText}>
              99.9% prediction accuracy across global atmospheric layers.
            </p>
          </div>

          <div className={`${s.featureCard} ${s.card3}`}>
            <div
              className={s.iconWrapper}
              style={{ background: "#ff9f43", color: "#fff" }}
            >
              <LuGlobe size={24} />
            </div>
            <h3 className={s.featureTitle}>Global Impact</h3>
            <p className={s.featureText}>
              Serving 45 countries with hyper-local weather intelligence for
              safer communities.
            </p>
          </div>

          <div className={`${s.featureCard} ${s.card4}`}>
            <h3 className={s.featureTitle}>Sustainable Innovation</h3>
            <p className={s.featureText}>
              Our servers run on 100% renewable energy, ensuring that tracking
              the planet's health doesn't cost the planet its future.
            </p>
            <div className={s.blob}></div>
          </div>
        </div>

        <div className={s.teamSection}>
          <div className={s.teamHeader}>
            <h2 className={s.teamMainTitle}>The Minds Behind the Atmosphere</h2>
            <p className={s.teamSubtitle}>
              A collective of scientists, designers, and dreamers.
            </p>
          </div>

          <div className={s.expertWrapper}>
            <div className={s.mockupContainer}>
              <img
                src={dashboardImg}
                alt="Weather Dashboard"
                className={s.dashboardMockup}
              />
              <div className={s.quoteCard}>
                “Meteorology is the ultimate intersection of data and poetry.”
              </div>
            </div>

            <div className={s.expertContent}>
              <span className={s.jobTitle}>CHIEF METEOROLOGIST</span>
              <h3 className={s.expertName}>Dr. Elena Voss</h3>
              <p className={s.expertBio}>
                With over two decades of experience at the World Meteorological
                Organization and a Ph.D. in Atmospheric Physics from Oxford, Dr.
                Voss leads our global research initiatives. Her work focuses on
                bridging the gap between raw satellite telemetry and actionable
                human insights.
              </p>

              <div className={s.statsRow}>
                <div className={s.statItem}>
                  <h4>15+</h4>
                  <p className={s.statLabel}>Patents Held</p>
                </div>
                <div className={s.statItem}>
                  <h4>200k</h4>
                  <p className={s.statLabel}>Lives Impacted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhoWeAre;
