import Footer from "components/Footer";
import Header from "components/Header";
import Navbar from "components/Navbar";

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
      <div className={"ml-[350px]"}>
        <h1 style={{ textAlign: "center" }}>Here are some of our best deals going on!</h1>
        <div className={"flex flex-row"}>
          {deals.map(({ url }) => {
            return (
              <div className={"py-5 px-5"}>
                <img src={url} alt="Not found" />
              </div>
            );
          })}
        </div>
        <div className={"flex flex-row"}>
          {deals.map(({ url }) => {
            return (
              <div className={"py-5 px-5"}>
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
