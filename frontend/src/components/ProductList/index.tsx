import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./index.css";
import axios from "axios";
import { getUser } from "util/local/index";
import { Product } from "types";
import Loader from "components/Loader";

interface PaginateBtns {
  count: number;
  range: number[];
}

const ProductList = () => {
  const user = getUser();
  const [btnCount, setBtnCount] = useState<PaginateBtns>({
    count: 0,
    range: [],
  });
  const [currentBtn, setCurrentBtn] = useState(0);
  const [dataToShow, setDataToShow] = useState<Product[]>([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [verifyEmailError, setVerifyEmailError] = useState("");
  const [search, setSearch] = useState({
    params: "",
    category: "name",
    range: [],
  });

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_BACKEND}/products/all?page=1&limit=8`)
        .then((response) => {
          setDataToShow(response.data.results.products);
          setOriginalData(response.data.results.products);
          setBtnCount((prevState) => ({
            ...prevState,
            count: Math.ceil(response.data.results.total / 8),
            range: [0, 3],
          }));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setLoadingError(true);
        });
    } catch (error) {
      console.log("Failed to call products");
    }
  }, []);

  // Use Effect for button range changes
  useEffect(() => {}, [btnCount]);

  const [searchTimeout, setSearchTimeout] = useState<any>("");

  // const startSearching = ;
  useEffect(() => {
    clearTimeout(searchTimeout);
    if (search.params === "") {
      setDataToShow(originalData);
      return;
    }

    setSearchTimeout(
      setTimeout(() => {
        axios
          .get(
            `${process.env.REACT_APP_BASE_BACKEND}/products/search/${search.category}/${search.params}`
          )
          .then((response) => {
            setDataToShow(response.data.results);
          })
          .catch((err) => {
            console.log(err);
            setDataToShow([]);
          });
      }, 2000)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.params, search.category, originalData]);

  const paginateChange = (index: number) => {
    if (currentBtn === index) {
      return;
    }
    try {
      setLoading(true);
      axios
        .get(`${process.env.REACT_APP_BASE_BACKEND}/products/all?page=${index + 1}&limit=8`)
        .then((response) => {
          setDataToShow(response.data.results.products);
          setOriginalData(response.data.results.products);
          setBtnCount((prevState) => ({
            ...prevState,
            count: Math.ceil(response.data.results.total / 8),
            range: [0, 3],
          }));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingError(true);
        });
    } catch (error) {
      console.log("Failed to call products");
    }
  };

  const paginateInc = () => {
    if (btnCount.range[0] !== 0) {
      setBtnCount((prevState) => ({
        ...prevState,
        range: [btnCount.range[0] - 1, btnCount.range[1] - 1],
      }));
    }
  };

  const paginateDec = () => {
    if (btnCount.range[1] !== btnCount.count) {
      setBtnCount((prevState) => ({
        ...prevState,
        range: [prevState.range[0] + 1, prevState.range[1] + 1],
      }));
    }
  };

  const addToCart = (data: any) => {
    try {
      if (!user.isEmailVerified) {
        console.log("Cannot add to cart, please verify email");
        setVerifyEmailError("Cannot add to cart, please verify email");
        return;
      }
      axios
        .post(
          `${process.env.REACT_APP_BASE_BACKEND}/cart/add-product`,
          {
            userId: user._id.toString(),
            productId: data._id,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        )
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = (productId: string) => {
    try {
      setDataToShow((product) => product.filter((element) => element._id !== productId));
      axios
        .delete(`${process.env.REACT_APP_BASE_BACKEND}/admin/products/delete/${productId}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        })
        .then((response) => {
          // console.log(response);
          console.log(dataToShow);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="productlist">
      <div className="productlist__child">
        <div className="productlist__child__search">
          <div className="productlist__child__search__radio">
            <input
              type="radio"
              value="name"
              name="category"
              defaultChecked
              onChange={(e) => {
                setSearch((prevState) => ({ ...prevState, category: e.target.value }));
              }}
            />
            Name
            <input
              type="radio"
              value="type"
              name="category"
              onChange={(e) => {
                setSearch((prevState) => ({ ...prevState, category: e.target.value }));
              }}
            />
            Type
          </div>
          <input
            type="text"
            onChange={(e) => {
              setSearch((prevState) => ({ ...prevState, params: e.target.value }));
            }}
            value={search.params}
            className="productlist__child__search__input"
          />
        </div>
      </div>
      <div style={{ color: "red", textAlign: "center" }}>{verifyEmailError}</div>

      {!loading ? (
        <div className="productlist__list">
          {dataToShow.length ? (
            dataToShow.map((element) => {
              return (
                <ProductCard
                  key={element._id}
                  data={element}
                  dispatchMethod={addToCart}
                  deleteProduct={deleteProduct}
                />
              );
            })
          ) : (
            <div>No results to show</div>
          )}
        </div>
      ) : (
        <Loader />
      )}
      {loadingError ? <div style={{ textAlign: "center" }}>Error loading data</div> : null}
      {/* Refactor buttons for pagination */}
      <div className="productlist__pagination">
        {
          <button
            className="productlist__pagination__btn"
            style={
              btnCount.range[0] !== 0 ? undefined : { backgroundColor: "gray", color: "azure" }
            }
            onClick={
              btnCount.range[0] !== 0
                ? () => {
                    paginateInc();
                  }
                : undefined
            }
          >
            {"<"}
          </button>
        }
        {Array(btnCount.count)
          .fill(undefined)
          .map((_, i) => {
            if (i >= btnCount.range[0] && i < btnCount.range[1]) {
              return (
                <button
                  className="productlist__pagination__btn"
                  key={i}
                  value={i}
                  onClick={() => {
                    setCurrentBtn(i);
                    paginateChange(i);
                  }}
                >
                  {i + 1}
                </button>
              );
            } else {
              return null;
            }
          })}
        <button
          className="productlist__pagination__btn"
          style={
            btnCount.range[1] !== btnCount.count
              ? undefined
              : { backgroundColor: "gray", color: "azure" }
          }
          onClick={
            btnCount.range[1] !== btnCount.count
              ? () => {
                  paginateDec();
                }
              : undefined
          }
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default ProductList;
