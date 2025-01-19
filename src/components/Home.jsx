import React from "react";

const Home = () => {
  return (
    <div className="bg-[var(--bg-color)] min-h-[calc(100vh-var(--header-height-sm))] md:min-h-[calc(100vh-var(--header-height-md))] lg:min-h-[calc(100vh-var(--header-height-lg))] text-[var(--text-color)]  px-8 md:px-12 lg:px-16 flex flex-col items-center">
      <h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold text-center mt-12 md:mt-16">
        Welcome to Sutta’s Apparel!
      </h1>
      <p className="text-xs md:text-base lg:text-xl text-center mt-4 md:mt-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
        iste excepturi. Necessitatibus, unde temporibus! Eveniet, corporis
        minus? Facilis, asperiores cum.
      </p>
      <button className="bg-[var(--secondary-color)] text-[var(--text-color)] text-base md:text-xl font-bold mt-12 md:mt-16 h-10 md:h-12 px-4 py-2 flex justify-center gap-1">
        Shop{" "}
        <span className="material-symbols-outlined  font-bold text-base md:text-xl">
          arrow_forward
        </span>
      </button>
    </div>
  );
};

export default Home;
