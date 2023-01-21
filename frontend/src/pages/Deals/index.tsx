import Footer from "components/Footer";
import Header from "components/Header";
import Navbar from "components/Navbar";
import "./index.scss";

const Deals = () => {
  const deals = [
    { url: `${process.env.REACT_APP_BASE_BACKEND}/files/deals/deal1.webp` },
    { url: `${process.env.REACT_APP_BASE_BACKEND}/files/deals/deal2.webp` },
    { url: `${process.env.REACT_APP_BASE_BACKEND}/files/deals/deal3.webp` },
    { url: `${process.env.REACT_APP_BASE_BACKEND}/files/deals/deal4.webp` },
  ];
  return (
    <>
      <Header />
      <Navbar />
      <div className="deals">
        <h1 className="deals__header">Here are some of our best deals going on!</h1>
        <div className="deals__content">
          {deals.map(({ url }) => {
            return (
              <div>
                <img src={url} alt="Not found" />
              </div>
            );
          })}
        </div>
        <div className="deals__content">
          {deals.map(({ url }) => {
            return (
              <div>
                <img src={url} alt="Not found" />
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Deals;
