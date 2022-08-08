import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import getUser from "util/local/getUser";
import removeUser from "util/local/removeUser";
import "./index.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="nav">
      <div className="nav__container">
        <Link className="nav__link" to="/home">
          Home
        </Link>
        <Link className="nav__link" to="/products">
          Products
        </Link>
        {user && user.isAdmin ? (
          <Link className="nav__link" to="/products/add">
            Add Product
          </Link>
        ) : (
          <Link className="nav__link" to="/deals">
            Deals
          </Link>
        )}
        <a
          href="/#"
          className="nav__link"
          onClick={() => {
            removeUser();
            navigate("/");
          }}
        >
          Log Out
        </a>
      </div>
    </div>
  );
};

export default Navbar;
