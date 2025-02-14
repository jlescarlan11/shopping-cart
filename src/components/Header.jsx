import React, { useEffect, useContext } from "react";
import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { MobileMenuContext } from "../App";

// Custom hook to check if the viewport is mobile-sized.
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

const Header = () => {
  const { showMenu, setShowMenu } = useContext(MobileMenuContext);
  const isMobile = useIsMobile();

  const menuItems = [
    { icon: "home", label: "Home", path: "/" },
    { icon: "shop", label: "Shop", path: "/shop" },
    { icon: "shopping_cart", label: "Cart", path: "/cart" },
  ];

  useEffect(() => {
    // Lock scrolling when mobile menu is open.
    document.body.style.overflow = showMenu ? "hidden" : "auto";
    // Close mobile menu on Escape key press.
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showMenu) {
        setShowMenu(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showMenu, setShowMenu]);

  return (
    <header className="sticky top-0 left-0 w-full bg-[var(--primary-color)] text-[var(--text-color)] px-8 md:px-12 lg:px-16">
      <div className="flex justify-between items-center">
        <img
          src={logo}
          alt="Company Logo"
          className="size-[var(--header-height-sm)] md:size-[var(--header-height-md)] lg:size-[var(--header-height-lg)]"
        />
        {isMobile ? (
          <button
            className="size-[var(--header-height-sm)] md:size-[var(--header-height-md)] lg:size-[var(--header-height-lg)] text-center content-center"
            onClick={() => setShowMenu((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={showMenu}
          >
            <span className="material-symbols-outlined text-base md:text-lg lg:text-2xl">
              menu
            </span>
          </button>
        ) : (
          <nav className="flex space-x-8" role="navigation" aria-label="Main Navigation">
            {menuItems.map((menuItem, index) => (
              <NavLink
                to={menuItem.path}
                key={index}
                className={({ isActive }) =>
                  isActive
                    ? "text-xl font-bold text-[var(--accent-color)]"
                    : "text-xl font-medium"
                }
              >
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-base md:text-lg lg:text-2xl">
                    {menuItem.icon}
                  </span>
                  <p className="text-xs">{menuItem.label}</p>
                </div>
              </NavLink>
            ))}
          </nav>
        )}
      </div>
      {isMobile && showMenu && (
        <nav
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--primary-color)] transition-opacity duration-300"
          role="navigation"
          aria-label="Mobile Navigation"
        >
          <button
            className="absolute top-0 right-8 md:right-12 lg:right-16"
            onClick={() => setShowMenu((prev) => !prev)}
            aria-label="Close menu"
          >
            <div className="size-[var(--header-height-sm)] md:size-[var(--header-height-md)] lg:size-[var(--header-height-lg)] text-center content-center">
              <span className="material-symbols-outlined text-base md:text-lg lg:text-2xl">
                close
              </span>
            </div>
          </button>
          <div className="space-y-4">
            {menuItems.map((menuItem, index) => (
              <NavLink
                to={menuItem.path}
                key={index}
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-xl font-bold text-[var(--accent-color)]"
                    : "text-xl font-medium"
                }
              >
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-base md:text-lg lg:text-2xl">
                    {menuItem.icon}
                  </span>
                  <p className="text-sm md:text-sm lg:text-xl">{menuItem.label}</p>
                </div>
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
