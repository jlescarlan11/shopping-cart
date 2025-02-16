import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { MobileMenuContext } from "../App";

const Home = () => {
  const [greeting, setGreeting] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  const { showMenu } = useContext(MobileMenuContext);

  // Determine greeting based on time of day.
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  // Trigger fade-in animation on component mount.
  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div
      className={`bg-[var(--bg-color)] min-h-[calc(100vh-var(--header-height))] md:min-h-[calc(100vh-var(--header-height))] lg:min-h-[calc(100vh-var(--header-height))] text-[var(--text-color)] px-8 sm:px-24 lg:px-72 flex flex-col gap-10 items-center transition-opacity duration-1000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mt-16 md:mt-20 lg:mt-24 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
          Welcome to Sutta’s Apparel!
        </h1>
        <h2 className="text-xl md:text-2xl mt-4">
          {greeting}, style awaits you!
        </h2>
      </div>
      <p className="text-sm md:text-base lg:text-lg text-center max-w-3xl">
        Discover the latest trends and exclusive collections that match your
        unique style. Step into a world where fashion meets comfort..
      </p>

      {!showMenu && (
        <NavLink
          to="/shop"
          className="btn bg-[var(--secondary-color)] text-[var(--text-color)] text-base md:text-xl font-bold h-10 md:h-12 px-4 py-2 flex items-center justify-center gap-1 transform transition-transform hover:scale-105"
        >
          Shop
          <span className="material-symbols-outlined font-bold text-base md:text-xl">
            arrow_forward
          </span>
        </NavLink>
      )}
    </div>
  );
};

export default Home;
