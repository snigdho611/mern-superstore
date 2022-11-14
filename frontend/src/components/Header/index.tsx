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
