import Footer from "components/Footer";
import { Response } from "components/Form";
import Header from "components/Header";
import Loader from "components/Loader";
import Navbar from "components/Navbar";
// import ProductList from "components/ProductList";
import ProductCard from "components/ProductCard";
import React, { useEffect, useState } from "react";
import { Product } from "types";
import "./index.css";

const ProductsPage = () => {
  const [originalData, setOriginalData] = useState<Product[]>([]);
  const [dataToShow, setDataToShow] = useState<Product[]>([]);
  const [response, setResponse] = useState<Response>({
    success: false,
    loading: false,
    message: "",
  });
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_BACKEND}/products/all`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log(json.results.products);
        setOriginalData(json.results.products);
        setResponse((prevState) => ({ ...prevState, loading: false }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setDataToShow(originalData);
  }, [originalData]);

  useEffect(() => {
    console.log(dataToShow.length);
  }, [dataToShow]);

  return (
    <>
      <Header />
      <Navbar />
      <div className="productlist">
        {/* <Loader /> */}
        {!response.loading ? (
          <div className="productlist__list">
            {dataToShow.length > 0 ? (
              dataToShow.map((element) => {
                //   console.log(element);
                return (
                  <ProductCard
                    key={element._id}
                    data={element}
                    dispatchMethod={null}
                    deleteProduct={null}
                  />
                );
              })
            ) : (
              <Loader />
            )}
          </div>
        ) : (
          <div>No results</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
