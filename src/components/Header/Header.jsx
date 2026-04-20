import React, { useState } from "react";
import Container from "../Container";
import AuthBtn from "./AuthBtn";
import css from "./Header.module.css";
import logo from "../../assets/img/logo.svg";
import { PiUserCircleLight } from "react-icons/pi";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <header className={css.headerContainer}>
        <Container>
          <div className={css.contentWrapper}>

            <div className={css.logoWrp}>
              <img className={css.logo} src={logo} alt="logo" />
            </div>

            <nav className={css.nav}>
              <ul className={css.menuList}>
                <li className={css.menuItem}>
                  <a className={css.menuLink} href="#">
                    Who we are
                  </a>
                </li>
                <li className={css.menuItem}>
                  <a className={css.menuLink} href="#">
                    Contacts
                  </a>
                </li>
                <li className={css.menuItem}>
                  <a className={css.menuLink} href="#">
                    Menu
                  </a>
                </li>
              </ul>
            </nav>

            <div className={css.authSection}>
              <AuthBtn isLoggedIn={isLoggedIn} onClick={() => setIsLoggedIn(!isLoggedIn)} />
              <PiUserCircleLight size={37} color="#444" className="cursor-pointer" />
            </div>

          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
