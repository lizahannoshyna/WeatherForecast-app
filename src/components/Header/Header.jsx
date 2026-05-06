import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Container from "../Container";
import AuthBtn from "./AuthBtn";
import css from "./Header.module.css";
import logo from "../../assets/img/logo.svg";
import { PiUserCircleLight } from "react-icons/pi";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Header = () => {
  const { isSignIn, openModal, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={css.headerContainer}>
      <Container>
        <div className={css.contentWrapper}>
          <div className={css.logoWrp}>
            <img className={css.logo} src={logo} alt="logo" />
          </div>

          <nav className={`${css.nav} ${isMenuOpen ? css.navOpen : ""}`}>
            <ul className={css.menuList}>
              <li className={css.menuItem}>
                <Link className={css.menuLink} to="/" onClick={closeMenu}>Home</Link>
              </li>
              <li className={css.menuItem}>
                <Link className={css.menuLink} to="/about" onClick={closeMenu}>Who we are</Link></li>
              <li className={css.menuItem}>
                <Link className={css.menuLink} to="/contacts" onClick={closeMenu}>Contacts</Link></li>
              <li className={css.mobileAuthItem}>
                <AuthBtn
                  isLoggedIn={isSignIn}
                  onOpenAuth={() => { openModal(); closeMenu(); }}
                  onLogout={() => { logout(); closeMenu(); }}
                />
              </li>
            </ul>
          </nav>

          <div className={css.authSection}>
            <div className={css.desktopAuth}>
              <AuthBtn
                isLoggedIn={isSignIn}
                onOpenAuth={openModal}
                onLogout={logout}
              />
            </div>

            {isSignIn && <span className={css.userName}>Hello, {user?.displayName}</span>}

            <PiUserCircleLight size={37} color="#444" className="cursor-pointer" />

            <button className={css.burgerBtn} onClick={toggleMenu}>
              {isMenuOpen ? <HiX size={32} /> : <HiMenuAlt3 size={32} />}
            </button>
          </div>
        </div>
      </Container>

      {isMenuOpen && <div className={css.overlay} onClick={closeMenu}></div>}
    </header>
  );
};

export default Header;