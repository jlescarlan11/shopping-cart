import React, { useEffect, useState } from "react";
import { use } from "react";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);
  const [seeMore, setSeeMore] = useState(false);

  const categories = [
    { label: "All", category: "" },
    { label: "Men", category: "men's clothing" },
    { label: "Women", category: "women's clothing" },
    { label: "Jewelery", category: "jewelery" },
    { label: "Electronics", category: "electronics" },
  ];

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
      console.log(items);
      setItems(items);
    };

    fetchItems();
  }, []);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  useEffect(() => {
    setSeeMore(false);
  }, []);

  return (
    <>
      <nav className="bg-[var(--bg-color)]">
        <ul className="flex justify-center gap-4">
          {categories.map((category, index) => (
            <li
              key={index}
              className="p-4"
              onClick={() => {
                const filteredItems = items.filter((item) =>
                  category.category
                    ? item.category === category.category
                    : item.category === item.category
                );
                setFilteredItems(filteredItems);
              }}
            >
              {category.label}
            </li>
          ))}
        </ul>
      </nav>
      <div className="bg-[var(--bg-color)] min-h-[calc(100vh-var(--header-height-sm))]  md:min-h-[calc(100vh-var(--header-height-md))] lg:min-h-[calc(100vh-var(--header-height-lg))] text-[var(--text-color)] py-8 px-8 sm:px-24 lg:px-72 grid sample gap-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className="min-w-24 bg-[#ffffff] flex flex-col justify-between"
          >
            <div className="flex flex-col h-auto justify-between p-4">
              <div className="flex flex-col gap-1">
                <img
                  src={item.image}
                  className="w-auto h-52 bg-transparent p-4"
                />
                <div>
                  <span
                    className="truncate w-full block cursor-pointer"
                    onClick={() => {
                      console.log("Title clicked");
                      setSeeMore(!seeMore);
                    }}
                  >
                    {!seeMore &&
                      (item.title.length > 30 ? (
                        <>
                          {item.title.slice(0, 29)}
                          <span className="material-symbols-outlined text-sm">
                            more_horiz
                          </span>
                        </>
                      ) : (
                        item.title
                      ))}
                    {seeMore && item.title}
                  </span>
                </div>
                <span className="flex items-center">
                  {item.rating.rate}{" "}
                  <span className="material-symbols-outlined text-sm">
                    star
                  </span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-base font-medium">
                  <span className="">₱ {item.price}.00</span>
                </div>
                <span className="material-symbols-outlined cursor-p">
                  add_shopping_cart
                </span>
              </div>

              {/* <div className="flex items-center justify-between p-4 h-[calc(100%-13rem)] gap-4">
                <div className="text-xs h-full flex flex-col justify-between items-baseline"></div>
                <div className="text-xs h-full flex flex-col justify-between items-center">
                  <div></div>
                </div>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Shop;
