import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Products";
import Products from "./components/Products";

const App = () => {
  // return (
  //   <div className={classes.flex_center}>
  //     <h3 style={{ textAlign: "center" }}>Please log in to continue</h3>
  //     <div className={classes.flex_center}>
  //       <div>
  //         <div className={classes.flex_row}>
  //           <div style={{ width: "150px" }}>
  //             <label>Username:</label>
  //           </div>
  //           <div style={{ width: "210px" }}>
  //             <input className={classes.inputBox} type="text" />
  //           </div>
  //         </div>
  //         <div className={classes.flex_row}>
  //           <div style={{ width: "150px" }}>
  //             <label>Password:</label>
  //           </div>
  //           <div style={{ width: "210px" }}>
  //             <input className={classes.inputBox} type="text" />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
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
