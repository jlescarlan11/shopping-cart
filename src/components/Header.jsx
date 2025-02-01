import React, { useEffect } from "react";
import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [activeMenu, setActiveMenu] = React.useState("home");
  const [showMenu, setShowMenu] = React.useState(false);

  const menuItems = [
    { icon: "home", label: "Home", path: "/" },
    { icon: "shop", label: "Shop", path: "/shop" },
    { icon: "shopping_cart", label: "Cart", path: "/cart" },
  ];

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup when unmounting
    };
  }, [showMenu]);

  return (
    <>
      <div className="sticky top-0 left-0 w-full bg-[var(--primary-color)] text-[var(--text-color)] px-8 md:px-12 lg:px-16 ">
        <div className="flex justify-between items-center">
          <img
            src={logo}
            alt=""
            className="size-[var(--header-height-sm)] md:size-[var(--header-height-md)] lg:size-[var(--header-height-lg)]"
          />
          <div className="flex">
            <button
              className="size-[var(--header-height-sm)] md:size-[var(--header-height-md)] lg:size-[var(--header-height-lg)] text-center content-center"
              onClick={() => setShowMenu(!showMenu)}
            >
              <span className="material-symbols-outlined text-base md:text-lg lg:text-2xl">
                menu
              </span>
            </button>
          </div>
        </div>
        {showMenu && (
          <nav className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--primary-color)]">
            <button
              className="absolute top-0 right-8 md:right-12 lg:right-16"
              onClick={() => setShowMenu(!showMenu)}
            >
              <div className="size-[var(--header-height-sm)] md:size-[var(--header-height-md)] lg:size-[var(--header-height-lg)] text-center content-center">
                <span className="material-symbols-outlined text-base md:text-lg lg:text-2xl">
                  close
                </span>
              </div>
            </button>
            <div>
              {menuItems.map((menuItem, index) => (
                <NavLink
                  to={menuItem.path}
                  key={index}
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <div>
                    <div className="size-[var(--header-height-sm)] md:size-[var(--header-height-md)] lg:size-[var(--header-height-lg)] text-center content-center">
                      <span className="material-symbols-outlined text-base md:text-lg lg:text-2xl">
                        {menuItem.icon}
                      </span>
                      <p className="text-sm md:text-sm lg:text-xl">
                        {menuItem.label}
                      </p>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </div>
    </>
  );
};

export default Header;
