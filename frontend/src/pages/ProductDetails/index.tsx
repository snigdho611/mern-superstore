import Footer from "components/Footer";
import Header from "components/Header";
import Loader from "components/Loader";
import Navbar from "components/Navbar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product, Response } from "types";
import "./index.scss";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [response, setResponse] = useState<Response>({
    success: false,
    loading: false,
    message: "",
  });

  useEffect(() => {
    setResponse((prevState) => ({ ...prevState, loading: true }));
    fetch(`${process.env.REACT_APP_BASE_BACKEND}/products/details/${productId}`)
      .then((response) => response.json())
      .then((json) => {
        setProduct(json.results);
        setResponse((prevState) => ({ ...prevState, loading: false }));
      })
      .catch((err) => {
        console.log(err);
        console.log("Could not load data");
        setResponse((prevState) => ({ ...prevState, loading: false }));
      });
  }, [productId]);

  return (
    <>
      <Header />
      <Navbar />
      {response.loading ? (
        <Loader />
      ) : (
        <div className="productdetails">
          <div className="productdetails__container">
            <div className="productdetails__container__row">
              <div className="productdetails__container__row__label">ID:</div>
              <div className="productdetails__container__row__data">#{product?.id}</div>
            </div>
            <div className="productdetails__container__row">
              <div className="productdetails__container__row__label">NAME:</div>
              <div className="productdetails__container__row__data">{product?.name}</div>
            </div>
            <div className="productdetails__container__row">
              <div className="productdetails__container__row__label">WEIGHT:</div>
              <div className="productdetails__container__row__data">{product?.weight}</div>
            </div>
            <div className="productdetails__container__row">
              <div className="productdetails__container__row__label">PRICE:</div>
              <div className="productdetails__container__row__data">{product?.price} BDT</div>
            </div>
            <div className="productdetails__container__row">
              <div className="productdetails__container__row__label">TYPE:</div>
              <div className="productdetails__container__row__data">{product?.type}</div>
            </div>
            <div className="productdetails__container__row">
              <div className="productdetails__container__row__label">DESCRIPTION:</div>
              <div className="productdetails__container__row__data">{product?.description}</div>
            </div>
          </div>
          <div className="productdetails__container__img">
            <img
              src={
                product?.image
                  ? `${process.env.REACT_APP_BASE_BACKEND}${product.image.replace(/\\/g, "/")}`
                  : "https://www.tazzadesign.com/wp-content/uploads/sites/65/2013/11/dummy-image-square-300x300.jpg"
              }
              alt="Not found"
              className="productdetails__container__img__input"
            />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ProductDetails;
