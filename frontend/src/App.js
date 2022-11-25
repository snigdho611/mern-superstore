import "./index.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "pages/ForgotPassword/ForgotPassword";
import ProductsPage from "pages/ProductsPage";
import "styles/index.css";
import Login from "pages/Login";
import Register from "pages/Register";
import ResetPassword from "pages/ResetPassword";
import Home from "pages/Home";
import VerifyEmail from "components/VerifyEmail";
import UpdateProduct from "pages/UpdateProduct";
import ProductDetails from "pages/ProductDetails";
import Cart from "pages/Cart";
import AddProduct from "pages/AddProduct";

const App = () => {
  const routes = [
    {
      path: "/",
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
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element }, i) => {
          return <Route key={i} path={path} element={<>{element}</>} />;
        })}
        {/* <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <ProductsPage />
            </>
          }
        />
        <Route
          path="/products/:productId"
          element={
            <>
              <Header />
              <Navbar />
              <ProductDetails />
              <Footer />
            </>
          }
        />
        <Route
          path="/deals"
          element={
            <>
              <Header />
              <Navbar />
              <Deals />
              <Footer />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Header />
              <Navbar />
              <Cart />
              <Footer />
            </>
          }
        />
        <Route
          path="/products/edit/:productId"
          element={
            <>
              <Header />
              <Navbar />
              <ChangeProduct />
              <Footer />
            </>
          }
        />
        <Route
          path="/products/add/"
          element={
            <>
              <Header />
              <Navbar />
              <AddProduct />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Register />
            </>
          }
        />
        <Route
          path="/email-verify"
          element={
            <>
              <Header />
              <VerifyEmail />
              <Footer />
            </>
          }
        />
        <Route
          path="/reset-password/:token/:userId"
          element={
            <>
              <Header />
              <ResetPassword />
              <Footer />
            </>
          }
        />
        <Route
          path="/reset-password-request"
          element={
            <>
              <Header />
              <ForgotPassword />
              <Footer />
            </>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
