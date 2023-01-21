import Footer from "components/Footer";
import Header from "components/Header";
import Navbar from "components/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./index.scss";

const Home = () => {
  const store = useSelector((state: any) => ({
    user: state.user.user,
  }));

  return (
    <>
      <Header />
      <Navbar />
      <div className="home">
        <h2 className="text-xl">
          Welcome to ABC Store{" "}
          {` ${store.user && store.user.firstName} ${store.user && store.user.lastName} `}
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
