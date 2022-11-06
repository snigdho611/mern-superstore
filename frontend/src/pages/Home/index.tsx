import Footer from "components/Footer";
import Header from "components/Header";
import HomeCard from "components/HomeCard";
import Navbar from "components/Navbar";
import { getUser } from "util/local";

const Home = () => {
  const user = getUser();
  return (
    <>
      <Header />
      <Navbar />
      <HomeCard user={user} />
      <Footer />
    </>
  );
};

export default Home;
