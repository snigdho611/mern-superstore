import "./index.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "components/Header";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import ChangeProduct from "components/UpdateForm/ChangeProduct";
import AddProduct from "components/UpdateForm/AddProduct";
import VerifyEmail from "components/VerifyEmail";
// import Register from "components/Authenticate/Register";
import Cart from "components/Cart";
import Deals from "components/Deals";
// import Home from "components/Home";
// import Login from "components/Authenticate/Login";
import ProductDetails from "components/ProductDetails";
// import ProductList from "pages/ProductList";
// import ResetPassword from "components/Authenticate/ResetPassword";
import ForgotPassword from "pages/ForgotPassword/ForgotPassword";
import ProductsPage from "pages/ProductsPage";
import "styles/index.css";
import Login from "pages/Login";
import Register from "pages/Register";
import ResetPassword from "pages/ResetPassword";
import Home from "pages/Home";

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
