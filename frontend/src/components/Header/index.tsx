import React from "react";
import { Link } from "react-router-dom";
import { getUser } from "util/local/index";

const Header: React.FC = () => {
  let user = getUser();

  return (
    <div className="bg-blue-900 sticky flex top-0 h-24 shadow-lg shadow-blue-300">
      <div className="w-1/2 flex justify-end">
        <Link to={user ? "/home" : "/"}>
          <img
            // style={{ height: "50px" }}
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
            <Link to="/cart" className="cart__btn">
              <div className="h-10 w-10 mx-5 my-5 px-2 py-2 rounded-3xl bg-blue-100 hover:bg-blue-400 transition-colors">
                <img src="/images/shopping-cart.png" alt="Not found" />
              </div>
            </Link>
          )
        ) : null}
        <Link to="/profile" className="cart__btn">
          <div className="h-10 w-10 mx-5 my-5 px-2 py-2 rounded-3xl bg-blue-100 hover:bg-blue-400 transition-colors">
            <img src="/images/profile.png" alt="Not found" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
