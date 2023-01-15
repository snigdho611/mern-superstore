import Footer from "components/Footer";
import { Response } from "components/Form";
import Header from "components/Header";
import Loader from "components/Loader";
import Modal from "components/Modal";
import Navbar from "components/Navbar";
import ProductCard from "components/ProductCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate, NavigateFunction } from "react-router-dom";
import { Product } from "types";
import "./index.scss";

const ProductsPage = () => {
  const [dataToShow, setDataToShow] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [response, setResponse] = useState<Response>({
    success: false,
    loading: false,
    message: "",
  });
  const [range, setRange] = useState({ min: 1, max: 3 });

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<string | null>();

  const [searchParams] = useSearchParams();
  const navigate: NavigateFunction = useNavigate();

  const store = useSelector((state: any) => ({
    user: state.user.user,
  }));

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
    if (dataToShow.length === 0) {
      navigate({
        pathname: "/products",
        search: `?page=1`,
      });
    }
  }, [navigate, dataToShow]);

  useEffect(() => {
    if (!searchParams.get("page")) {
      navigate({
        pathname: "/products",
        search: `?page=1`,
      });
    }
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
  }, [navigate, searchParams]);

  const deleteProduct = (_id: string) => {
    setModalOpen(true);
    setProductId(_id);
  };

  const confirmDeletion = () => {
    fetch(`${process.env.REACT_APP_BASE_BACKEND}/admin/products/delete/${productId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          setDataToShow(dataToShow.filter((element) => element._id !== productId));
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // console.log(store?.user?.access_token);
  const addToCart = (_id: string) => {
    fetch(`${process.env.REACT_APP_BASE_BACKEND}/cart/add-product`, {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.user && store.user.access_token}`,
      },
      body: JSON.stringify({
        userId: store.user?._id,
        productId: _id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          setDataToShow(dataToShow.filter((element) => element._id !== productId));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(total);

  // useEffect(() => {}, [navigate, searchParams]);
  useEffect(() => {
    console.log(range);
  }, [range]);

  return (
    <>
      {modalOpen ? (
        <Modal
          message="Are you sure you want to delete this product?"
          buttons={[
            { text: "Yes", function: confirmDeletion },
            { text: "No", function: closeModal },
          ]}
        />
      ) : null}
      <Header />
      <Navbar />
      <div className="productspage">
        {!response.loading ? (
          <div className="productspage__card">
            {dataToShow.length > 0 ? (
              dataToShow.map((element) => {
                return (
                  <ProductCard
                    key={element._id}
                    data={element}
                    dispatchMethod={null}
                    deleteProduct={deleteProduct}
                    addToCart={addToCart}
                    isAdmin={(store.user && store.user.isAdmin) as boolean}
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
      <div className="productspagination">
        {parseInt(searchParams.get("page") as string) > 3 ? (
          <button
            onClick={() => {
              if (range.max < total) {
                setRange((prevState) => ({ min: prevState.min - 1, max: prevState.max - 1 }));
              }
            }}
            className="productspagination__gobackbutton"
          >
            {"<"}
          </button>
        ) : null}

        {/* {Array(3).fill(0).map((element, i) => { */}
        {Array.from(Array(Math.ceil(total / 8)).keys()).map((element, i) => {
          return (
            <button
              key={i}
              onClick={() => {
                navigate({
                  pathname: "/products",
                  search: `?page=${i + 1}`,
                });
              }}
              className={`w-[80px] outline-1 outline outline-zinc-600 rounded-lg py-2 hover:bg-blue-300 transition-colors ${
                parseInt(searchParams.get("page") as string) === i + 1
                  ? "bg-blue-300"
                  : "bg-blue-50"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
        {/* {parseInt(searchParams.get("page") as string) <= Math.ceil(total / 8) - 3 ? (
          <button
            onClick={() => {
              console.log(range.min);
              if (range.min <= Math.ceil(total / 8)) {
                setRange((prevState) => ({ min: prevState.min + 1, max: prevState.max + 1 }));
              }
            }}
            className={`w-[80px] outline-1 outline outline-zinc-600`}
          >
            {">"}
          </button>
        ) : null} */}
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
