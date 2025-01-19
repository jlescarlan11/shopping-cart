import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Shop from "./components/Shop";
import Cart from "./components/Cart";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

const routes = createBrowserRouter([
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
        <Shop />
      </Layout>
    ),
  },
  {
    path: "/cart",
    element: (
      <Layout>
        <Cart />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
