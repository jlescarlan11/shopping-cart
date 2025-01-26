import React from "react";

const Cart = ({ cart }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <div>
                <h3>{item.title}</h3>
                <p>₱ {item.price}</p>
              </div>
              <p>Quantity: {item.quantity}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
