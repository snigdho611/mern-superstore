import React from "react";
import { Link } from "react-router-dom";

const HomeCard: React.FC<any> = ({ user }) => {
  // console.log(user);
  return (
    <div className="mx-auto w-fit text-center">
      <h2 className="text-xl">Welcome to ABC Store {` ${user.firstName} ${user.lastName} `}</h2>
      <p>
        Find our best deals at{" "}
        <Link to="/deals">
          <label className="text-blue-700 hover:text-blue-400 transition-colors">here</label>
        </Link>
      </p>
      <p>
        Or find products that you want to buy over{" "}
        <Link className="text-blue-700 hover:text-blue-400 transition-colors" to="/products">
          here
        </Link>
      </p>
    </div>
  );
};

export default HomeCard;
