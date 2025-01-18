import React from "react";
import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <>
      <div className="bg-[var(--bg-color)] text-[var(--text-color)] flex justify-between items-center">
        <img src={logo} alt="" className="size-40" />
        <div className="flex">
          <div className="size-40 text-center content-center">
            <span className="material-symbols-outlined text-6xl">home</span>
          </div>
          <div className="size-40 text-center content-center">
            <span className="material-symbols-outlined text-6xl">shop</span>
          </div>
          <div className="size-40 text-center content-center">
            <span className="material-symbols-outlined text-6xl">
              shopping_cart
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
