import "./App.css";
import ProductList from "components/ProductList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "components/Navbar";
import { useSelector } from "react-redux";

function App() {

  const counter = useSelector((state) => state.counter);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><div>Counter: {counter}</div></>} />
        <Route path="/home" />
        <Route path="/products" element={<><Navbar /><ProductList /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
