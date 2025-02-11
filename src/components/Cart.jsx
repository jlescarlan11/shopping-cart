import React, { useState } from "react";

const Cart = ({ cart, removeFromCart }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (itemTitle) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(itemTitle)
          ? prevSelected.filter((title) => title !== itemTitle) // Remove if already selected
          : [...prevSelected, itemTitle] // Add if not selected
    );
  };

  // Remove all selected items
  const handleRemoveSelected = async () => {
    console.log(selectedItems);

    await removeFromCart(selectedItems);
    setSelectedItems([]); // Clear selection after deletion
  };

  return (
    <div className="p-4 flex flex-col min-h-[calc(100vh-var(--header-height-sm))]  md:min-h-[calc(100vh-var(--header-height-md))] lg:min-h-[calc(100vh-var(--header-height-lg))] justify-between">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <span
            onClick={handleRemoveSelected}
            className={`material-symbols-outlined px-4 py-2 ${
              selectedItems.length === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-black cursor-pointer"
            }`}
          >
            delete
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id} // Key should be here
                className="flex justify-between items-center border p-4  rounded"
              >
                <label className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    value={item.id}
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="w-4 h-4"
                  />
                  <img src={item.image} className="size-12" alt="" />
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p>₱ {item.price}</p>
                  </div>
                  <p>Quantity: {item.quantity}</p>
                </label>
              </div>
            ))
          )}
        </div>
        {/* Remove selected items button */}
      </div>
      <div className="flex gap-4 items-center justify-end">
        <span>
          Total: ₱{" "}
          {cart
            .filter((item) => selectedItems.includes(item.id))
            .reduce((total, item) => total + item.price * item.quantity, 0)}
        </span>
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
