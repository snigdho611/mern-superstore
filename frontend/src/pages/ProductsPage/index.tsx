import Footer from "components/Footer";
import { Response } from "components/Form";
import Header from "components/Header";
import Loader from "components/Loader";
import Navbar from "components/Navbar";
// import ProductList from "components/ProductList";
import ProductCard from "components/ProductCard";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Product } from "types";
import "./index.css";

const ProductsPage = () => {
  // const [originalData, setOriginalData] = useState<Product[]>([]);
  const [dataToShow, setDataToShow] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [response, setResponse] = useState<Response>({
    success: false,
    loading: false,
    message: "",
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // console.log(searchParams.get("text"));

  useEffect(() => {
    // console.log(searchParams.get("page"));
    fetch(
      `${process.env.REACT_APP_BASE_BACKEND}/products/all?page=${searchParams.get("page")}&limit=8`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((json) => {
        // console.log(json.results.products);
        // setOriginalData(json.results.products);
        if (json.results.products.length) {
          setDataToShow(json.results.products);
          setResponse((prevState) => ({ ...prevState, loading: false }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchParams]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_BACKEND}/products/all?page=1&limit=8`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log(json.results.products);
        // setOriginalData(json.results.products);
        console.log(json.results);
        setTotal(json.results.total);
        setDataToShow(json.results.products);
        setResponse((prevState) => ({ ...prevState, loading: false }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   setDataToShow(originalData);
  // }, [originalData]);

  useEffect(() => {
    console.log(dataToShow.length);
  }, [dataToShow]);

  // console.log(Array(8).fill(1));
  return (
    <>
      <Header />
      <Navbar />
      <div className="z-10 ml-[15%] w-[80%]">
        {!response.loading ? (
          <div className="flex flex-row justify-center flex-wrap mt-8 mb-16 mx-auto gap-5">
            {dataToShow.length > 0 ? (
              dataToShow.map((element) => {
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
      <div
        style={{
          margin: "0 auto",
          width: "50%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {/* {console.log(Array(originalData.length / 8))} */}
        {Array.from(Array(Math.ceil(total / 8)).keys()).map((element) => {
          return (
            <button
              onClick={() => {
                navigate({
                  pathname: "/products",
                  search: `?page=${element + 1}`,
                });
              }}
              style={{ width: "80px", outline: "#bbb solid 1px" }}
            >
              {element + 1}
            </button>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
