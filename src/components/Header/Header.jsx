import React, { useState } from "react";
import Container from "../Container";
import AuthBtn from "./AuthBtn";
import css from "./Header.module.css";
import logo from "../../assets/img/logo.svg"
import { PiUserCircleLight } from "react-icons/pi"; 

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <header className={css.headerContainer}>
        <Container>
            <div className="flex items-center justify-between py-4">
        <div className={css.logoWrp}>
          <img className={css.logo} src={logo} alt="logo" />
        </div>

        <nav className={`${css.nav} `}>
          <ul className={css.menuList}>
            <li className={css.menuItem}><a className={css.menuLink} href="#">Who we are</a></li>
            <li className={css.menuItem}><a className={css.menuLink} href="#">Contacts</a></li>
            <li className={css.menuItem}><a className={css.menuLink} href="#">Menu</a></li>
          </ul>
        </nav>

<div className="flex items-center gap-5">
            <AuthBtn 
              isLoggedIn={isLoggedIn} 
              onClick={() => setIsLoggedIn(!isLoggedIn)} 
            />
            <div className="cursor-pointer hover:opacity-80 transition-opacity">
              <PiUserCircleLight size={35} color="#444" />
            </div>
          </div>

        <div className={css.authSection}>
        </div>

        </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
