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

const routes = (addToCart, cart) =>
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
          <Cart cart={cart} />
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
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Add new item
        return [...prevCart, { ...item, quantity: 1 }];
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

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      <RouterProvider router={routes(addToCart, cart)} />
    </CartContext.Provider>
  );
}

export default App;
