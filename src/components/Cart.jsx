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
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
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
        <button
          onClick={handleRemoveSelected}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          disabled={selectedItems.length === 0}
        >
          Remove Selected
        </button>
      </div>
      <button className="border bg-red-300 p-4">Checkout</button>
    </div>
  );
};

export default Cart;
