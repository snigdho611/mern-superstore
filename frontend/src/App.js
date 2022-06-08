import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import HomePage from "pages/HomePage";
import ProductsPage from "pages/ProductsPage";
import ProductsIdPage from "pages/ProductsIdPage";
import DealsPage from "pages/Deals";
import ChangePage from "pages/ChangePage";
import CartPage from "pages/CartPage";
import Header from "components/Header";
import Navbar from "components/Navbar";
import ProductList from "components/ProductList";
import Footer from "components/Footer";
import ChangeProduct from "components/ChangeProduct";
import AddProduct from "components/AddProduct";
import VerifyEmail from "components/VerifyEmail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductsIdPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/change" element={<ChangePage />} />
        <Route path="/cart" element={<CartPage />} />
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
        <Route path="/email-verify/:token/:userId" element={<VerifyEmail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
