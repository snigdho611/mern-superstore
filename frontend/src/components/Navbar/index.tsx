import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUser, removeUser } from "util/local/index";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, [user, navigate]);
  // console.log(location.pathname);

  return (
    <div className="fixed bg-cyan-800 w-[15rem] z-10">
      <div className="top-0 flex flex-col h-[100vh]">
        <Link
          className={`text-center no-underline cursor-pointer text-xl transition-colors px-[10px] text-cyan-200 hover:bg-cyan-600 hover:text-gray-900 py-[2vh] ${
            location.pathname === "/home" ? "bg-cyan-600 text-gray-800" : null
          }`}
          to="/home"
        >
          Home
        </Link>
        <Link
          className={`text-center no-underline cursor-pointer text-xl transition-colors px-[10px] text-cyan-200 hover:bg-cyan-600 hover:text-gray-900 py-[2vh] ${
            location.pathname === "/products" ? "bg-cyan-600 text-gray-800" : null
          }`}
          to="/products"
        >
          Products
        </Link>
        {user && user.isAdmin ? (
          <Link
            className={`text-center no-underline cursor-pointer text-xl transition-colors px-[10px] text-cyan-200 hover:bg-cyan-600 hover:text-gray-900 py-[2vh] ${
              location.pathname === "/products/add" ? "bg-cyan-600 text-gray-800" : null
            }`}
            to="/products/add"
          >
            Add Product
          </Link>
        ) : (
          <Link
            className={`text-center no-underline cursor-pointer text-xl transition-colors px-[10px] text-cyan-200 hover:bg-cyan-600 hover:text-gray-900 py-[2vh] ${
              location.pathname === "/deals" ? "bg-cyan-600 text-gray-800" : null
            }`}
            to="/deals"
          >
            Deals
          </Link>
        )}
        <a
          href="/#"
          className={`text-center no-underline cursor-pointer text-xl transition-colors px-[10px] text-cyan-200 hover:bg-cyan-600 hover:text-gray-900 py-[2vh]`}
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
