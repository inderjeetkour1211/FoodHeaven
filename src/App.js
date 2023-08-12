import "./App.css";
import Header from "./Components/Header";
import Body from "./Components/Body";
import { createBrowserRouter } from "react-router-dom";
import About from "./Components/About";
import Error from "./Components/Error";
import { Outlet } from "react-router-dom";
import RestaurantMenu from "./Components/RestaurantMenu";
import { Provider } from "react-redux";
import store from "./Utils/Store";
import Cart from "./Components/Cart";
import Footer from "./Components/Footer";
function AppLayout() {
  return (
    <Provider store={store}>
      <Header />
      <Outlet />
      <Footer />
    </Provider>
  );
}

export const appRouter = createBrowserRouter([
  // THIS ARRAY IS A LIST OF PATHS
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/restaurant/:resid",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);
export default AppLayout;
