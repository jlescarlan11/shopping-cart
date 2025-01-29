import React, { createContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Shop from "./components/Shop";
import Cart from "./components/Cart";

// Create Cart Context
export const CartContext = createContext();

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

const routes = (addToCart, cart, removeFromCart) =>
  createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: "/shop",
      element: (
        <Layout>
          <Shop addToCart={addToCart} />
        </Layout>
      ),
    },
    {
      path: "/cart",
      element: (
        <Layout>
          <Cart cart={cart} removeFromCart={removeFromCart} />
        </Layout>
      ),
    },
  ]);

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        // Update quantity
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // Add new item
        return [...prevCart, { ...item }];
      }
    });

    // Optionally send data to the server
    fetch("https://fakestoreapi.com/carts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1, // Replace with your logic
        date: new Date().toISOString().slice(0, 10),
        products: [{ productId: item.id, quantity: 1 }],
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Server cart updated:", data))
      .catch((err) => console.error("Error:", err));
  };

  const removeFromCart = async (itemIds) => {
    try {
      // Assuming you need to delete each item from an API
      await Promise.all(
        itemIds.map(async (itemId) => {
          const response = await fetch(
            `https://fakestoreapi.com/carts/${itemId}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error(`Failed to delete item with ID: ${itemId}`);
          }
        })
      );

      // Update cart state after deletion
      setCart((prevCart) =>
        prevCart.filter((item) => !itemIds.includes(item.id))
      );

      console.log("Deleted items:", itemIds);
    } catch (error) {
      console.error("Error deleting items:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      <RouterProvider router={routes(addToCart, cart, removeFromCart)} />
    </CartContext.Provider>
  );
}

export default App;
