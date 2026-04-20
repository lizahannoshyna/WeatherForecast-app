import React from "react";
import css from "./AuthBtn.module.css"
const AuthBtn = ({ isLoggedIn, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${css.btn} ${isLoggedIn ? css.logOut : css.signUp}`}
    >
      {isLoggedIn ? "Log Out" : "Sign Up"}
    </button>
  );
};

export default AuthBtn;
