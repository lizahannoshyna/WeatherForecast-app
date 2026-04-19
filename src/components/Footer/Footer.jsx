import React from "react";
import css from "./Footer.module.css";
import Container from "../Container";
import logo from "../../assets/img/logo.svg"
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <Container>
        <div className={css.grid}>

          <div className={css.logo}>
            <img src={logo} alt="logo" />
          </div>

          <div className={css.address}>
            <h3 className={css.sectionTitle}>Address</h3>
            <p>Svobody str. 35</p>
            <p>Kyiv</p>
            <p>Ukraine</p>
          </div>

          <div>
            <h3 className={css.sectionTitle}>Contact us</h3>
            <div className={css.socialList}>
              <a href="#" className={css.socialLink}>
                <FaInstagram size={20} />
              </a>
              <a href="#" className={css.socialLink}>
                <FaFacebook size={20} />
              </a>
              <a href="#" className={css.socialLink}>
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

        </div>

      </Container>
    </footer>
  );
};

export default Footer;