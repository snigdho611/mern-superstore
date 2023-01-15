import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "store/user";
import "./index.scss";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [optmenu, setOptment] = useState<boolean>(false);
  const menuRef = useRef<any>(null);

  useEffect(() => {
    if (menuRef && menuRef.current) {
      if (optmenu) {
        menuRef.current.style.display = "flex";
      } else {
        menuRef.current.style.display = "none";
      }
    }
  }, [optmenu]);
  const store = useSelector((state: any) => ({
    user: state.user.user,
  }));

  return (
    <div className="header">
      <div className="header__segment">
        <Link to={store.user ? "/home" : "/"} className="header__segment__link">
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
        {store.user ? (
          store.user.isAdmin ? (
            <div>
              <div>Admin Mode</div>
            </div>
          ) : (
            <Link to="/cart" className="header__imglink">
              <div className="header__imglink__cart">
                <img
                  className="header__imglink__cart__img"
                  src="/images/shopping-cart.png"
                  alt="Not found"
                />
              </div>
            </Link>
          )
        ) : null}
        {store.user ? (
          <div className="menu">
            <div
              className="menu__imgcontainer"
              onClick={() => {
                setOptment(!optmenu);
              }}
            >
              <img src="/images/profile.png" alt="Not found" className="menu__imgcontainer__img" />
            </div>
            <div className="menu__options" ref={menuRef}>
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
