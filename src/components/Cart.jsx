import React, { useState } from "react";

const Cart = ({ cart, removeFromCart, updateCart }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState(
    cart.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
  );
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Delay helper
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Show confirmation for a fixed duration and then clear it.
  const showConfirmation = async (message) => {
    setConfirmationMessage(message);
    setIsFadingOut(false);
    // Start fade-out after 1 second.
    await delay(1000);
    setIsFadingOut(true);
    // Wait another second for the fade-out to complete.
    await delay(1000);
    setConfirmationMessage("");
  };

  // Toggle checkbox selection for an item.
  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  // Remove all selected items.
  const handleRemoveSelected = async () => {
    console.log("Removing:", selectedItems);
    await removeFromCart(selectedItems);
    setSelectedItems([]); // Clear selection after deletion.
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative or zero quantity.
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: newQuantity,
    }));
  };

  const handleQuantityUpdate = async (itemId) => {
    await updateCart(itemId, quantities[itemId]);
  };

  // Handler for the delete icon: first show confirmation, then remove items.
  const handleDeleteClick = async () => {
    if (selectedItems.length === 0) return;
    await Promise.all([
      handleRemoveSelected(),
      showConfirmation("Item removed from cart!"),
    ]);
  };

  return (
    <div className="p-4 flex flex-col min-h-[calc(100vh-var(--header-height-sm))] md:min-h-[calc(100vh-var(--header-height-md))] lg:min-h-[calc(100vh-var(--header-height-lg))] justify-between">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <span
            onClick={handleDeleteClick}
            className={`material-symbols-outlined px-4 py-2 ${
              selectedItems.length === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-black cursor-pointer"
            }`}
          >
            delete
          </span>
        </div>
        {confirmationMessage && (
          <div
            className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50 transition-opacity duration-500 ${
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
        <div className="flex flex-col gap-2">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border p-4 rounded"
              >
                <label className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    value={item.id}
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="w-4 h-4"
                  />
                  <img src={item.image} className="size-12" alt={item.title} />
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p>₱ {item.price}</p>
                  </div>
                </label>
                <input
                  type="number"
                  value={quantities[item.id]}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  onBlur={() => handleQuantityUpdate(item.id)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleQuantityUpdate(item.id)
                  }
                  className="w-16 border rounded text-center"
                />
              </div>
            ))
          )}
        </div>
      </div>
      <div className="flex gap-4 items-center justify-end">
        <div className="w-32">
          <span>
            Total: ₱{" "}
            {cart
              .filter((item) => selectedItems.includes(item.id))
              .reduce(
                (total, item) =>
                  total + item.price * (quantities[item.id] || item.quantity),
                0
              )}
          </span>
        </div>
        {/* If you want the Checkout button to trigger removal directly, consider unifying the UX */}
        <button
          className="border bg-red-300 p-4"
          onClick={handleRemoveSelected}
          disabled={selectedItems.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
