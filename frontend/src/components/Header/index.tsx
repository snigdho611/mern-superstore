import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, removeUser } from "util/local/index";

const Header: React.FC = () => {
  let user = getUser();
  const navigate = useNavigate();

  return (
    <div className="bg-blue-900 sticky flex top-0 h-24 shadow-lg shadow-blue-300">
      <div className="w-1/2 flex justify-end">
        <Link to={user ? "/home" : "/"}>
          <img
            className="h-[70px]"
            src={
              "https://res.cloudinary.com/drnym8nne/image/upload/v1659979478/superstore/basic/supermarket_bwbuit.png"
            }
            alt=""
          />
        </Link>
      </div>
      <div className="w-1/2 flex justify-end">
        {user ? (
          user.isAdmin ? (
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
        {user ? (
          <div>
            <div className="cursor-pointer h-10 w-10 mx-5 my-5 px-2 py-2 rounded-3xl bg-blue-100 hover:bg-blue-400 transition-colors">
              <img src="/images/profile.png" alt="Not found" />
            </div>
            <div className="text-center absolute right-0 bg-blue-200">
              <div
                className="cursor-pointer hover:bg-blue-50 transition-colors py-1 px-5 border-2 border-blue-700 border-solid"
                onClick={() => {
                  navigate("/history");
                }}
              >
                Check History
              </div>
              <div
                className="cursor-pointer hover:bg-blue-50 transition-colors py-1 px-5 border-2 border-blue-700 border-solid"
                onClick={() => {
                  navigate("/update-profile");
                }}
              >
                Update Profile
              </div>
              <div
                className="cursor-pointer hover:bg-blue-50 transition-colors py-1 px-5 border-2 border-blue-700 border-solid"
                onClick={() => {
                  navigate("/update-password");
                }}
              >
                Update Password
              </div>
              <div
                className="cursor-pointer hover:bg-blue-50 transition-colors py-1 px-5 border-2 border-blue-700 border-solid"
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
