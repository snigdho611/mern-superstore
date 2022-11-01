import "./index.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "components/Header";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import ChangeProduct from "components/UpdateForm/ChangeProduct";
import AddProduct from "components/UpdateForm/AddProduct";
import VerifyEmail from "components/VerifyEmail";
import Register from "components/Authenticate/Register";
import Cart from "components/Cart";
import Deals from "components/Deals";
import Home from "components/Home";
import Login from "components/Authenticate/Login";
import ProductDetails from "components/ProductDetails";
// import ProductList from "pages/ProductList";
import ResetPassword from "components/Authenticate/ResetPassword";
import ForgotPassword from "components/Authenticate/ForgotPassword";
import ProductsPage from "pages/ProductsPage";
import "styles/index.css";

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
              {/* <Header />
              <Navbar />
              <ProductList />
              <Footer /> */}
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
              <Header />
              <Register />
              <Footer />
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
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
