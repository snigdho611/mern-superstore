import "./App.css";
import ProductList from "components/ProductList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "components/Navbar";
import { useSelector } from "react-redux";
import Header from "components/Header";
import Login from "Login";

function App() {
  const counter = useSelector((state) => state.counter);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
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
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
