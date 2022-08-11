import React from "react";
import { Link } from "react-router-dom";
import { getUser } from "util/local/index";
import "./index.css";
// import shopLogo from "shop.png";

const Header: React.FC = () => {
  let user = getUser();

  return (
    <div className="header">
      <div className="header__col">
        <Link to={user ? "/home" : "/"}>
          <img
            // style={{ height: "50px" }}
            className="header__col__image"
            src={
              "https://res.cloudinary.com/drnym8nne/image/upload/v1659979478/superstore/basic/supermarket_bwbuit.png"
            }
            alt=""
          />
        </Link>
      </div>
      <div className="header__col">
        {user ? (
          user.isAdmin ? (
            <div>
              <div>Admin Mode</div>
            </div>
          ) : (
            <div>
              <Link to="/cart" className="cart__btn">
                Cart
              </Link>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Header;
