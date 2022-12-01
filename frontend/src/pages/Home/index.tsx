import Footer from "components/Footer";
import Header from "components/Header";
import Navbar from "components/Navbar";
import { Link } from "react-router-dom";
import { getUser } from "util/local";

const Home = () => {
  const user = getUser();
  return (
    <>
      <Header />
      <Navbar />
      <div className="mx-auto w-fit text-center">
        <h2 className="text-xl">
          Welcome to ABC Store {` ${user && user.firstName} ${user && user.lastName} `}
        </h2>
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

      <Footer />
    </>
  );
};

export default Home;
