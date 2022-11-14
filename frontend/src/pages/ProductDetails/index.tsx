import axios from "axios";
import Footer from "components/Footer";
import Header from "components/Header";
import Navbar from "components/Navbar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "types";
// import "./index.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_BACKEND}/products/details/${productId}`)
      .then((response) => {
        setProduct(response.data.results);
      })
      .catch((err) => {
        console.log("Could not load data");
      });
  }, [productId]);
  return product ? (
    <>
      <Header />
      <Navbar />

      <div className="ml-[300px] mt-5 w-[70%] flex border-2 border-solid border-blue-900">
        <div className="flex flex-col w-1/2">
          <div className="flex flex-row">
            <div className="py-2 px-0  border-b-2 border-solid border-r-2 border-blue-900 w-[30%]">
              ID:
            </div>
            <div className="w-[70%] py-2 border-b-2 border-r-2 border-blue-900">#{product.id}</div>
          </div>
          <div className="flex flex-row">
            <div className="py-2 px-0 border-r-2 border-b-2 border-solid border-blue-900 w-[30%]">
              NAME:
            </div>
            <div className="w-[70%] py-2 border-r-2 border-b-2 border-blue-900">{product.name}</div>
          </div>
          <div className="flex flex-row">
            <div className="py-2 px-0 border-b-2 border-r-2 border-solid border-blue-900 w-[30%]">
              WEIGHT:
            </div>
            <div className="w-[70%] py-2 border-b-2 border-r-2 border-blue-900">
              {product.weight}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="py-2 px-0 border-b-2 border-r-2 border-solid border-blue-900 w-[30%]">
              PRICE:
            </div>
            <div className="w-[70%] py-2 border-r-2 border-b-2 border-blue-900">
              {product.price} BDT
            </div>
          </div>
          <div className="flex flex-row">
            <div className="py-2 px-0 border-b-2 border-r-2 border-solid border-blue-900 w-[30%]">
              TYPE:
            </div>
            <div className="w-[70%] py-2 border-r-2 border-b-2 border-blue-900">{product.type}</div>
          </div>
          <div className="flex flex-row">
            <div className="py-2 px-0 border-r-2 border-solid border-blue-900 w-[30%]">
              DESCRIPTION:
            </div>
            <div className="w-[70%] py-2 border-r-2  border-blue-900">{product.description}</div>
          </div>
        </div>
        <div className="flex justify-center w-1/2">
          <img
            src={
              product.image
                ? `${process.env.REACT_APP_BASE_BACKEND}${product.image.replace(/\\/g, "/")}`
                : "https://www.tazzadesign.com/wp-content/uploads/sites/65/2013/11/dummy-image-square-300x300.jpg"
            }
            alt="Not found"
            className="h-[260px]"
          />
        </div>
      </div>
      <Footer />
    </>
  ) : null;
};

export default ProductDetails;
