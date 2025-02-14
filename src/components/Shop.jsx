import React, { useEffect, useState } from "react";

const Shop = ({ addToCart, cart }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const BASE_URL = "https://fakestoreapi.com/products";

  const categories = [
    { label: "All", category: "" },
    { label: "Men", category: "men's clothing" },
    { label: "Women", category: "women's clothing" },
    { label: "Jewelery", category: "jewelery" },
    { label: "Electronics", category: "electronics" },
  ];

  // Fetch items from API
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        if (!response.ok) throw new Error("Failed to fetch items");
        const data = await response.json();
        setItems(data);
        setFilteredItems(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchItems();
  }, []);

  // Handle category filter (combining search filter if present)
  const filterItems = (categoryValue = "", query = searchQuery) => {
    let updatedItems = [...items];
    if (categoryValue) {
      updatedItems = updatedItems.filter(
        (item) => item.category === categoryValue
      );
    }
    if (query) {
      updatedItems = updatedItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFilteredItems(updatedItems);
  };

  const handleCategoryClick = (categoryValue) => {
    filterItems(categoryValue);
  };

  // Update search and filter items
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterItems("", query);
  };

  // Show and hide modal
  const showModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = modalVisible ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [modalVisible]);

  // Display confirmation message with fade-out effect
  const showConfirmation = (message) => {
    setConfirmationMessage(message);
    setIsFadingOut(false);
    setTimeout(() => setIsFadingOut(true), 1500);
    setTimeout(() => setConfirmationMessage(""), 2500);
  };

  return (
    <div>
      <nav className="bg-[var(--bg-color)] sticky top-[var(--header-height-sm)] left-0 w-full z-10">
        <div className="flex justify-center items-center flex-wrap gap-4 p-4">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => handleCategoryClick(cat.category)}
            >
              {cat.label}
            </button>
          ))}
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="p-2 border rounded ml-4"
          />
        </div>
      </nav>

      <div className="pt-8 px-8">
        {loading && <p>Loading items...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded shadow">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-contain cursor-pointer"
                onClick={() => showModal(item)}
              />
              <h3 className="mt-2 font-semibold truncate">{item.title}</h3>
              <p className="mt-1">₱ {item.price}</p>
              <div className="flex items-center mt-1">
                <span>{item.rating.rate}</span>
                <span className="material-symbols-outlined text-sm ml-1">
                  star
                </span>
              </div>
              <button
                className="mt-2 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                onClick={() => {
                  addToCart({ ...item, quantity });
                  showConfirmation("Item added to cart!");
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal rendered once */}
      {modalVisible && selectedItem && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{selectedItem.title}</h2>
              <button onClick={closeModal} className="text-gray-500">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="w-full h-64 object-contain my-4"
            />
            <p className="text-base mb-4">{selectedItem.description}</p>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Price: ₱ {selectedItem.price}</p>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-16 p-2 border rounded"
                />
                <button
                  className="flex flex-col items-center"
                  onClick={() => {
                    addToCart({ ...selectedItem, quantity });
                    showConfirmation("Item added to cart!");
                    closeModal();
                  }}
                >
                  <span className="material-symbols-outlined">
                    add_shopping_cart
                  </span>
                  <span className="text-xs">Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation message */}
      {confirmationMessage && (
        <div
          className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-4 rounded shadow transition-opacity duration-500 ${
            isFadingOut ? "opacity-0" : "opacity-100"
          }`}
        >
          {confirmationMessage}
        </div>
      )}
    </div>
  );
};

export default Shop;
