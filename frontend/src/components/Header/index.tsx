import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, removeUser } from "util/local/index";
import "./index.scss";

const Header: React.FC = () => {
  let user = getUser();
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header__segment">
        <Link to={user ? "/home" : "/"} className="header__segment__link">
          <img
            className="header__segment__link__image"
            src={
              "https://res.cloudinary.com/drnym8nne/image/upload/v1659979478/superstore/basic/supermarket_bwbuit.png"
            }
            alt=""
          />
        </Link>
      </div>
      <div className="header__segment">
        {user ? (
          user.isAdmin ? (
            <div>
              <div>Admin Mode</div>
            </div>
          ) : (
            <Link to="/cart" className="header__imglink">
              <div className="header__imglink__cart">
                <img src="/images/shopping-cart.png" alt="Not found" />
              </div>
            </Link>
          )
        ) : null}
        {user ? (
          <div className="menu">
            <div className="menu__imgcontainer">
              <img src="/images/profile.png" alt="Not found" className="menu__imgcontainer__img" />
            </div>
            <div className="menu__options">
              <div
                className="menu__options__option"
                onClick={() => {
                  navigate("/history");
                }}
              >
                Check History
              </div>
              <div
                className="menu__options__option"
                onClick={() => {
                  navigate("/update-profile");
                }}
              >
                Update Profile
              </div>
              <div
                className="menu__options__option"
                onClick={() => {
                  navigate("/update-password");
                }}
              >
                Update Password
              </div>
              <div
                className="menu__options__option"
                onClick={() => {
                  removeUser();
                  navigate("/");
                }}
              >
                Log Out
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
