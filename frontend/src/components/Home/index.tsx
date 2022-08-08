import React from "react";
import { Link } from "react-router-dom";
import localGetUser from "util/local/getUser";
import "./index.css";

const Home: React.FC = () => {
  const user = localGetUser();
  return (
    <div className="home">
      <h2 style={{ fontSize: "24px" }}>
        Welcome to ABC Store {` ${user?.firstName} ${user?.lastName} `}san
      </h2>
      <p>
        Find our best deals at{" "}
        <Link className="home__link" to="/deals">
          here
        </Link>
      </p>
      <p>
        Or find products that you want to buy over{" "}
        <Link className="home__link" to="/products">
          here
        </Link>
      </p>
    </div>
  );
};

export default Home;
