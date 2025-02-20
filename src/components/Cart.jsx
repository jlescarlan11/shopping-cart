import React, { useState, useEffect } from "react";

const Cart = ({ cart, removeFromCart, updateCart, proceedToCheckout }) => {
  // Synchronize quantities with the current cart items.
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    setQuantities(
      cart.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
    );
  }, [cart]);

  // Delay helper
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Show confirmation for a fixed duration then clear it.
  const showConfirmation = async (message) => {
    setConfirmationMessage(message);
    setIsFadingOut(false);
    await delay(1000);
    setIsFadingOut(true);
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

  // Toggle select-all functionality.
  const handleSelectAllChange = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
  };

  // Remove all selected items.
  const handleRemoveSelected = async () => {
    if (selectedItems.length === 0) return;
    await removeFromCart(selectedItems);
    setSelectedItems([]);
    await showConfirmation("Selected items removed from cart!");
  };

  //dummy checkout
  const handleCheckoutSelected = async () => {
    if (selectedItems.length === 0) return;
    await removeFromCart(selectedItems);
    setSelectedItems([]);
    await showConfirmation("Selected items has been checkout!");
  };

  // Handle quantity changes.
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities((prev) => ({ ...prev, [itemId]: newQuantity }));
  };

  const handleQuantityUpdate = async (itemId) => {
    await updateCart(itemId, quantities[itemId]);
  };

  // Compute total for all items.
  const totalAmount = cart.reduce(
    (total, item) =>
      total + item.price * (quantities[item.id] || item.quantity),
    0
  );

  return (
    <div className="p-4 flex flex-col min-h-[calc(100vh-var(--header-height))] md:min-h-[calc(100vh-var(--header-height))] lg:min-h-[calc(100vh-var(--header-height))] justify-between">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <span
            onClick={handleRemoveSelected}
            className={`material-symbols-outlined px-4 py-2 ${
              selectedItems.length === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-[var(--text-color)] cursor-pointer"
            }`}
            title="Remove selected items"
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

        <div className="flex items-center gap-2 mb-4">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={cart.length > 0 && selectedItems.length === cart.length}
              onChange={handleSelectAllChange}
              className="w-4 h-4"
            />
            <span>Select All</span>
          </label>
        </div>

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
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 bg-white object-contain p-1"
                  />
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p>₱ {item.price}</p>
                  </div>
                </label>
                <input
                  type="number"
                  value={quantities[item.id] || item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  onBlur={() => handleQuantityUpdate(item.id)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleQuantityUpdate(item.id)
                  }
                  className="w-16 border rounded text-center text-[var(--bg-color)]"
                />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row  items-end justify-end mt-4">
        <div className="w-full sm:w-32 text-right">
          <span className="font-semibold">
            Total: ₱ {totalAmount.toFixed(2)}
          </span>
        </div>
        <div className="flex gap-4">
          <button
            className={`border bg-[var(--secondary-color)] p-4 ${
              selectedItems.length === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-[var(--bg-color)] cursor-pointer"
            }`}
            onClick={handleCheckoutSelected}
            disabled={cart.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
