import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getUser } from "util/local/index";
import "./index.scss";

const Navbar: React.FC = () => {
  const location = useLocation();
  const user = getUser();

  return (
    <div className="navbar">
      <div className="navbar__container">
        <Link
          className={`navbar__container__link ${
            location.pathname === "/home" ? "navbar__container__link--active" : null
          }`}
          to="/home"
        >
          Home
        </Link>
        <Link
          className={`navbar__container__link ${
            location.pathname === "/products" ? "navbar__container__link--active" : null
          }`}
          to="/products"
        >
          Products
        </Link>
        {user && user.isAdmin ? (
          <Link
            className={`navbar__container__link ${
              location.pathname === "/products/add" ? "navbar__container__link--active" : null
            }`}
            to="/products/add-product"
          >
            Add Product
          </Link>
        ) : (
          <Link
            className={`navbar__container__link ${
              location.pathname === "/deals" ? "navbar__container__link--active" : null
            }`}
            to="/deals"
          >
            Deals
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
