import "./index.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import LoginPage from "pages/LoginPage";
// import HomePage from "pages/HomePage";
// import ProductsPage from "pages/ProductsPage";
// import ProductsIdPage from "pages/ProductsIdPage";
// import DealsPage from "pages/Deals";
// import ChangePage from "pages/ChangePage";
// import CartPage from "pages/CartPage";
import Header from "components/Header";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import ChangeProduct from "components/ChangeProduct";
import AddProduct from "components/AddProduct";
import VerifyEmail from "components/VerifyEmail";
import Register from "components/Authenticate/Register";
import Cart from "components/Cart";
import Form from "components/Form";
import Deals from "components/Deals";
import Home from "components/Home";
import Login from "components/Authenticate/Login";
import ProductDetails from "components/ProductDetails";
import ProductList from "components/ProductList";
import ResetPassword from "components/Authenticate/ResetPassword";
import ForgotPassword from "components/Authenticate/ForgotPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Login />
              <Footer />
            </>
          }
        />
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
              <Header />
              <Navbar />
              {/* <ProductDetails /> */}
              <ProductList />
              <Footer />
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
          path="/change"
          element={
            <>
              <Header />
              <Navbar />
              <Form />
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
              <Header />
              {/* <Navbar /> */}
              {/* <AddProduct /> */}
              <Register />
              <Footer />
            </>
          }
        />
        <Route
          path="/email-verify"
          element={
            <>
              {/* <Navbar /> */}
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
              {/* <VerifyEmail /> */}
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
              {/* <VerifyEmail /> */}
              {/* <ResetPassword /> */}
              <ForgotPassword />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
