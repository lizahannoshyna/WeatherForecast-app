import React from "react";

const AuthBtn = ({ isLoggedIn, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`
        ${
          isLoggedIn
            ? "border-2 border-[#ffb422] text-[#ffb422] bg-transparent hover:bg-[#ffb422] hover:text-white"
            : "bg-[#ffb422] text-white hover:bg-[#e5a31f] shadow-md hover:shadow-lg"
        }
      `}
      >
        {isLoggedIn ? "Log Out" : "Sign Up"}
      </button>
    </>
  );
};

export default AuthBtn;
