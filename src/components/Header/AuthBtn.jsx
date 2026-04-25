import React from "react";
import css from "./AuthBtn.module.css";

const AuthBtn = ({ isLoggedIn, onOpenAuth, onLogout }) => {
  return (
    <button
      onClick={isLoggedIn ? onLogout : onOpenAuth}
      className={`${css.btn} ${isLoggedIn ? css.logOut : css.signUp}`}
    >
      {isLoggedIn ? "Log Out" : "Sign In"}
    </button>
  );
};

export default AuthBtn;