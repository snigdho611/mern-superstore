import "./App.css";
import ProductList from "components/ProductList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "components/Navbar";
import Header from "components/Header";
import Login from "components/Login";
import Cart from "components/Cart";
import Form from "components/Form";
import ProductDetails from "components/ProductDetails";
import Footer from "components/Footer";
import Deals from "components/Deals";
import Home from "components/Home";

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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
