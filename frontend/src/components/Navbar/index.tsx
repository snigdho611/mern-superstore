import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUser, removeUser } from "util/local/index";
// import removeUser from "util/local/removeUser";
// import "./index.css";

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
    <div className="fixed bg-cyan-700 w-[15rem] z-10">
      <div className="top-0 flex flex-col h-[100vh]">
        <Link
          className={`text-center no-underline cursor-pointer text-xl text-zinc-800 transition-colors px-[10px] hover:bg-cyan-600 hover:text-gray-800 py-[2vh] ${
            location.pathname === "/home" ? "bg-cyan-600 text-gray-800" : null
          }`}
          to="/home"
        >
          Home
        </Link>
        <Link
          className={`text-center no-underline cursor-pointer text-xl text-zinc-800 transition-colors px-[10px] hover:bg-cyan-600 hover:text-gray-800 py-[2vh] ${
            location.pathname === "/products" ? "bg-cyan-600 text-gray-800" : null
          }`}
          to="/products"
        >
          Products
        </Link>
        {user && user.isAdmin ? (
          <Link
            className={`text-center no-underline cursor-pointer text-xl text-zinc-800 transition-colors px-[10px] hover:bg-cyan-600 hover:text-gray-800 py-[2vh] ${
              location.pathname === "/products/add" ? "bg-cyan-600 text-gray-800" : null
            }`}
            to="/products/add"
          >
            Add Product
          </Link>
        ) : (
          <Link
            className={`text-center no-underline cursor-pointer text-xl text-zinc-800 transition-colors px-[10px] hover:bg-cyan-600 hover:text-gray-800 py-[2vh] ${
              location.pathname === "/deals" ? "bg-cyan-600 text-gray-800" : null
            }`}
            to="/deals"
          >
            Deals
          </Link>
        )}
        <a
          href="/#"
          className={`nav__link`}
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
