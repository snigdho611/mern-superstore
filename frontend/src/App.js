import "./App.css";
import ProductList from "components/ProductList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "components/Navbar";
import Header from "components/Header";
import Login from "components/Login";
import Cart from "components/Cart";
import Form from "components/Form";

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
          path="/deals"
          element={
            <>
              <Header />
              <Navbar />
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
