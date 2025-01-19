import React from "react";
import logo from "../assets/logo.svg";

const Header = () => {
  const [activeMenu, setActiveMenu] = React.useState("home");
  const [showMenu, setShowMenu] = React.useState(false);

  const menuItem = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Shop",
      path: "/shop",
    },
    {
      name: "Cart",
      path: "/cart",
    },
  ];

  return (
    <>
      <div className="bg-[var(--primary-color)] text-[var(--text-color)] px-8 lg:px-40 ">
        <div className="flex justify-between items-center">
          <img src={logo} alt="" className="size-20 lg:size-40" />
          <div className="flex">
            <button
              className="size-20 lg:size-40 text-center content-center"
              onClick={() => setShowMenu(!showMenu)}
            >
              <span className="material-symbols-outlined text-3xl lg:text-6xl">
                menu
              </span>
            </button>
          </div>
        </div>
        {showMenu && (
          <nav className="flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full bg-[var(--primary-color)]">
            <button
              className="absolute top-0 right-8"
              onClick={() => setShowMenu(!showMenu)}
            >
              <div className="size-20 lg:size-40 text-center content-center">
                <span className="material-symbols-outlined text-2xl lg:text-6xl">
                  close
                </span>
              </div>
            </button>
            <div>
              <div className="size-20 lg:size-40 text-center content-center">
                <span className="material-symbols-outlined text-2xl lg:text-6xl">
                  home
                </span>
                <p>Home</p>
              </div>
              <div className="size-20 lg:size-40 text-center content-center">
                <span className="material-symbols-outlined text-2xl lg:text-6xl">
                  shop
                </span>
                <p>Shop</p>
              </div>
              <div className="size-20 lg:size-40 text-center content-center">
                <span className="material-symbols-outlined text-2xl lg:text-6xl">
                  shopping_cart
                </span>
                <p>Cart</p>
              </div>
            </div>
          </nav>
        )}
      </div>
    </>
  );
};

export default Header;
