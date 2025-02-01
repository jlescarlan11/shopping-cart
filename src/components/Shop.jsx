import React, { useEffect, useState } from "react";
import { use } from "react";

const Shop = ({ addToCart, cart }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);
  const [seeMore, setSeeMore] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);

  const showConfirmation = (message) => {
    setConfirmationMessage(message);
    setIsFadingOut(false);

    // Trigger fade-out after 2.5 seconds
    setTimeout(() => setIsFadingOut(true), 1000);

    // Clear the message after the transition ends
    setTimeout(() => setConfirmationMessage(""), 2000);
  };

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

  const toggleSeeMore = (id) => {
    setSeeMore((prevState) => {
      const newState = { ...prevState, [id]: !prevState[id] };
      return newState;
    });
  };

  const showModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    if (modalVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup when unmounting
    };
  }, [modalVisible]);

  return (
    <>
      <nav className=" bg-[var(--bg-color)] top-[var(--header-height-sm)] md:top-[var(--header-height-md)] lg:top-[var(--header-height-lg)] left-0 w-full z-10">
        <ul className=" flex  justify-center gap-4 flex-wrap">
          {categories.map((category, index) => (
            <li
              key={index}
              className="p-4 cursor-pointer"
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
      <div className="bg-[var(--bg-color)] min-h-[calc(100vh-(var(--header-height-sm)*2))] md:min-h-[calc(100vh-(var(--header-height-md)*2))] lg:min-h-[calc(100vh-(var(--header-height-lg)*2))] text-[var(--text-color)] py-8 px-32 justify-center grid sample gap-16 grid-cols-[repeat(auto-fill,15rem)]">
        {filteredItems.map((item, index) => (
          <div key={item.id} className="min-w-24  flex-col justify-between">
            <div className="flex flex-col h-fit justify bg-[#ffffff] flex-between p-4">
              <div className="flex flex-col gap-1">
                <img
                  src={item.image}
                  className="w-auto h-52 bg-transparent p-4"
                  onClick={() => showModal(item)}
                />
                <div>
                  <span className="truncate w-full block cursor-pointer">
                    {item.title}
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
                  <span className="">₱ {item.price}</span>
                </div>
                {/* <span
                  className="material-symbols-outlined cursor-p"
                  onClick={() => addToCart(item)}
                >
                  add_shopping_cart
                </span> */}
              </div>

              {modalVisible && selectedItem && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center cursor-context-menu">
                  <div className="bg-white p-6 rounded-lg max-w-md w-full">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold">
                        {selectedItem.title}
                      </h2>

                      <span
                        className="material-symbols-outlined cursor-pointer"
                        onClick={closeModal}
                      >
                        close
                      </span>
                    </div>
                    <div className="w-full h-64 flex justify-center p-4">
                      <img src={selectedItem.image} className=" " />
                    </div>
                    <p className="text-base text-justify mb-4">
                      {selectedItem.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-base font-semibold">
                        Price: ₱ {selectedItem.price}
                      </p>
                      <div className="flex items-center gap-4">
                        <input
                          type="number"
                          name="quantity"
                          id="quantity"
                          min="1"
                          defaultValue="1"
                          className="w-16 px-2 py-1 border rounded-lg"
                          onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                        <div
                          className="flex flex-col items-center cursor-pointer"
                          onClick={() => {
                            addToCart({ ...selectedItem, quantity });
                            showConfirmation("Item added to cart!");
                          }}
                        >
                          <span className="material-symbols-outlined ">
                            add_shopping_cart
                          </span>
                          <span className="text-xs">Add to Cart</span>
                        </div>
                      </div>
                      {confirmationMessage && (
                        <div
                          className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50 transition-opacity animate-fade-in duration-500 ${
                            isFadingOut ? "opacity-0" : "opacity-100"
                          }`}
                        >
                          <div
                            className={`bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg transform transition-transform duration-500 ${
                              isFadingOut ? "scale-90" : "scale-100"
                            }`}
                          >
                            {confirmationMessage}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Shop;
