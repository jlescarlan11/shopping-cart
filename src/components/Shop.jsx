import React from "react";

const Shop = () => {
  const items = [
    {
      img: "wala.jpg",
      name: "cutie pie",
      price: "20",
    },
    {
      img: "wala.jpg",
      name: "cuti potato",
      price: "50",
    },
    {
      img: "wala.jpg",
      name: "cut pota",
      price: "100",
    },
    {
      img: "wala.jpg",
      name: "c pota",
      price: "100",
    },
  ];
  return (
    <div className="bg-[var(--bg-color)] min-h-[calc(100vh-var(--header-height-sm))] md:min-h-[calc(100vh-var(--header-height-md))] lg:min-h-[calc(100vh-var(--header-height-lg))] text-[var(--text-color)] px-8 sm:px-24 lg:px-72 grid sample gap-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="min-w-24  border  bg-slate-80 h-60 relative"
        >
          <div className="relative">
            <div className="absolute bottom-0 left-0 right-0 text-center bg-slate-700 bg-opacity-20">
              <span className="">{item.name}</span>
              <br />
              <span className="">{item.price}</span>
            </div>
            <img src={item.img} className="w-auto h-60" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shop;
