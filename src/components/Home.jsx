import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-[var(--bg-color)] min-h-[calc(100vh-var(--header-height-sm))] md:min-h-[calc(100vh-var(--header-height-md))] lg:min-h-[calc(100vh-var(--header-height-lg))] text-[var(--text-color)] px-8 sm:px-24 lg:px-72 flex flex-col gap-10 items-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mt-16 md:mt-20 lg:mt-24 ">
        Welcome to Sutta’s Apparel!
      </h1>
      <p className="text-sm md:text-base lg:text-lg text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
        iste excepturi. Necessitatibus, unde temporibus! Eveniet, corporis
        minus? Facilis, asperiores cum.
      </p>
      <NavLink
        to={`/shop`}
        className="bg-[var(--secondary-color)] text-[var(--text-color)] text-base md:text-xl font-bold h-10 md:h-12 px-4 py-2 flex justify-center gap-1"
      >
        Shop{" "}
        <span className="material-symbols-outlined  font-bold text-base md:text-xl">
          arrow_forward
        </span>
      </NavLink>
    </div>
  );
};

export default Home;
