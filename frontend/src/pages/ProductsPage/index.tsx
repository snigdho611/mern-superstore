import Footer from "components/Footer";
import { Response } from "components/Form";
import Header from "components/Header";
import Loader from "components/Loader";
import Navbar from "components/Navbar";
import ProductCard from "components/ProductCard";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Product } from "types";

const ProductsPage = () => {
  const [dataToShow, setDataToShow] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [response, setResponse] = useState<Response>({
    success: false,
    loading: false,
    message: "",
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BASE_BACKEND}/products/all?page=${searchParams.get("page")}&limit=8`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((json) => {
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
        setTotal(json.results.total);
        setResponse((prevState) => ({ ...prevState, loading: false }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      <div className="my-0 mx-auto w-1/2 flex flex-row justify-center">
        {Array.from(Array(Math.floor(total / 8)).keys()).map((element, i) => {
          return (
            <button
              key={i}
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
