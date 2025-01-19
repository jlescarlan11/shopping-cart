import React from "react";

const Home = () => {
  return (
    <div className="bg-[var(--bg-color)] min-h-[calc(100vh-var(--header-height-sm))] text-[var(--text-color)]  px-8 lg:px-40 flex flex-col items-center">
      <h1 className="text-2xl lg:text-8xl font-extrabold text-center mt-12">
        Welcome to Sutta’s Apparel!
      </h1>
      <p className="text-xs lg:text-2xl max-w-[70ch] text-center mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
        iste excepturi. Necessitatibus, unde temporibus! Eveniet, corporis
        minus? Facilis, asperiores cum.
      </p>
      <button className="bg-[var(--secondary-color)] text-[var(--text-color)] text-base font-bold mt-12 h-10 px-4 py-2 flex justify-center gap-1">
        Shop{" "}
        <span className="material-symbols-outlined  font-bold text-base">
          arrow_forward
        </span>
      </button>
    </div>
  );
};

export default Home;
