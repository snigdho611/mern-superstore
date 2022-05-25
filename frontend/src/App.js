import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import HomePage from "pages/HomePage";
import ProductsPage from "pages/ProductsPage";
import ProductsIdPage from "pages/ProductsIdPage";
import DealsPage from "pages/Deals";
import ChangePage from "pages/ChangePage";
import CartPage from "pages/CartPage";

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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
