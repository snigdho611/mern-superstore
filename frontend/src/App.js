import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Products from "./components/Products";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route index path="/home" element={<Navbar />} />
        <Route
          index
          path="/products"
          element={
            <>
              <Navbar />
              <Products />
            </>
          }
        />
        <Route index path="/sellers" element={<Navbar />} />
        <Route index path="/deals" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
