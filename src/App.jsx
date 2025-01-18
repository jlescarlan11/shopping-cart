import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
