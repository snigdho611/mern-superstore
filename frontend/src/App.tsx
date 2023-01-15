import "./index.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "pages/ForgotPassword/ForgotPassword";
import ProductsPage from "pages/ProductsPage";
import "styles/index.scss";
import Login from "pages/Login";
import Register from "pages/Register";
import ResetPassword from "pages/ResetPassword";
import Home from "pages/Home";
import VerifyEmail from "components/VerifyEmail";
import UpdateProduct from "pages/UpdateProduct";
import ProductDetails from "pages/ProductDetails";
import Cart from "pages/Cart";
import AddProduct from "pages/AddProduct";
import Deals from "pages/Deals";
import History from "pages/History";
import UpdatePassword from "pages/UpdatePassword";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "store/user";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const routes = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/reset-password-request",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password/:token/:userId",
      element: <ResetPassword />,
    },
    {
      path: "/products",
      element: <ProductsPage />,
    },
    {
      path: "/product/edit/:productId",
      element: <UpdateProduct />,
    },
    {
      path: "/product/:productId",
      element: <ProductDetails />,
    },
    {
      path: "/email-verify",
      element: <VerifyEmail />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/products/add-product",
      element: <AddProduct />,
    },
    {
      path: "/deals",
      element: <Deals />,
    },
    {
      path: "/profile",
      // element: <UpdatePassword />,
    },
    {
      path: "/history",
      element: <History />,
    },
    {
      path: "/update-password",
      element: <UpdatePassword />,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element }, i) => {
          return <Route key={i} path={path} element={<>{element}</>} />;
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
