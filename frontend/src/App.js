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
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
