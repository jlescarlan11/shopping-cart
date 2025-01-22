import React, { useEffect, useState } from "react";
import { use } from "react";

const Shop = () => {
  const [items, setItems] = useState([]);

  // const items = [
  //   {
  //     img: "wala.jpg",
  //     name: "cutie pie",
  //     price: "20",
  //   },
  //   {
  //     img: "wala.jpg",
  //     name: "cuti potato",
  //     price: "50",
  //   },
  //   {
  //     img: "wala.jpg",
  //     name: "cut pota",
  //     price: "100",
  //   },
  //   {
  //     img: "wala.jpg",
  //     name: "c pota",
  //     price: "100",
  //   },
  // ];

  const BASE_URL = "https://fakestoreapi.com/products";

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`${BASE_URL}`);
      const items = await response.json();
      setItems(items);
    };

    fetchItems();
  }, []);

  return (
    <>
      <div className="bg-[var(--bg-color)] min-h-[calc(100vh-var(--header-height-sm))]  md:min-h-[calc(100vh-var(--header-height-md))] lg:min-h-[calc(100vh-var(--header-height-lg))] text-[var(--text-color)] px-8 sm:px-24 lg:px-72 grid sample gap-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item, index) => (
          <div key={item.id} className="min-w-24 h-fit  border  bg-slate-80">
            <div className="">
              <img src={item.image} className="w-auto h-52 bg-transparent" />
              <div className="flex justify-between items-center p-4">
                <div className="  ">
                  <span className="">{item.title}</span>
                  <br />
                  <span className="">{item.price}</span>
                </div>
                <div>
                  <span className="material-symbols-outlined">
                    add_shopping_cart
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Shop;
