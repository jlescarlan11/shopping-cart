import React from "react";

const Home = () => {
  return (
    <div className="bg-[var(--bg-color)] min-h-screen text-[var(--text-color)] px-40 flex flex-col items-center gap-32">
      <h1 className="text-10xl font-extrabold text-center">
        Welcome to Sutta’s Apparel!
      </h1>
      <p className="text-4xl max-w-[70ch] text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
        iste excepturi. Necessitatibus, unde temporibus! Eveniet, corporis
        minus? Facilis, asperiores cum.
      </p>
      <button className="bg-[var(--secondary-color)] text-[var(--text-color)] text-5xl font-semibold">
        Shop{" "}
        <span className="material-symbols-outlined size-8 font-semibold">
          arrow_forward
        </span>
      </button>
    </div>
  );
};

export default Home;
