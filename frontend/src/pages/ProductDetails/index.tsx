import Footer from "components/Footer";
import Header from "components/Header";
import Loader from "components/Loader";
import Navbar from "components/Navbar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product, Response } from "types";

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
        <div className="ml-[300px] mt-5 w-[70%] flex border-2 border-solid border-blue-900">
          <div className="flex flex-col w-1/2">
            <div className="flex flex-row">
              <div className="py-2 px-3  border-b-2 border-solid border-r-2 border-blue-900 w-[30%] text-right font-bold">
                ID:
              </div>
              <div className="w-[70%] py-2 border-b-2 border-r-2 border-blue-900">
                #{product?.id}
              </div>
            </div>
            <div className="flex flex-row">
              <div className="py-2 px-3 border-r-2 border-b-2 border-solid border-blue-900 w-[30%] text-right font-bold">
                NAME:
              </div>
              <div className="w-[70%] py-2 border-r-2 border-b-2 border-blue-900">
                {product?.name}
              </div>
            </div>
            <div className="flex flex-row">
              <div className="py-2 px-3 border-b-2 border-r-2 border-solid border-blue-900 w-[30%] text-right font-bold">
                WEIGHT:
              </div>
              <div className="w-[70%] py-2 border-b-2 border-r-2 border-blue-900">
                {product?.weight}
              </div>
            </div>
            <div className="flex flex-row">
              <div className="py-2 px-3 border-b-2 border-r-2 border-solid border-blue-900 w-[30%] text-right font-bold">
                PRICE:
              </div>
              <div className="w-[70%] py-2 border-r-2 border-b-2 border-blue-900">
                {product?.price} BDT
              </div>
            </div>
            <div className="flex flex-row">
              <div className="py-2 px-3 border-b-2 border-r-2 border-solid border-blue-900 w-[30%] text-right font-bold">
                TYPE:
              </div>
              <div className="w-[70%] py-2 border-r-2 border-b-2 border-blue-900">
                {product?.type}
              </div>
            </div>
            <div className="flex flex-row">
              <div className="py-2 px-3 border-r-2 border-solid border-blue-900 w-[30%] text-right font-bold">
                DESCRIPTION:
              </div>
              <div className="w-[70%] py-2 border-r-2  border-blue-900">{product?.description}</div>
            </div>
          </div>
          <div className="flex justify-center w-1/2">
            <img
              src={
                product?.image
                  ? `${process.env.REACT_APP_BASE_BACKEND}${product.image.replace(/\\/g, "/")}`
                  : "https://www.tazzadesign.com/wp-content/uploads/sites/65/2013/11/dummy-image-square-300x300.jpg"
              }
              alt="Not found"
              className="h-[260px]"
            />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ProductDetails;
