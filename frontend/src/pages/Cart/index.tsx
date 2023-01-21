import axios from "axios";
import Footer from "components/Footer";
import Header from "components/Header";
import Loader from "components/Loader";
import Navbar from "components/Navbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartItem, Product } from "types/index";
import "./index.scss";

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [success, setSuccess] = useState<Boolean>(false);
  const [displayCheckoutMsg, setDisplayCheckoutMsg] = useState<string>();
  const [loader, setLoader] = useState<Boolean>(false);
  const store = useSelector((state: any) => ({
    user: state.user.user,
  }));

  useEffect(() => {
    if (store.user._id) {
      fetch(`${process.env.REACT_APP_BASE_BACKEND}/cart/get`, {
        method: "POST",
        body: JSON.stringify({
          userId: store.user._id.toString(),
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${store.user && store.user.access_token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json.results.itemList);
          setCart(json.results.itemList);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [store.user]);

  const calculateTotal = () => {
    const total =
      cart &&
      cart.length > 0 &&
      cart.reduce((accumulator, object) => {
        return accumulator + ((object.productId as Product).price as number) * object.quantity;
      }, 0);
    return total;
  };

  const proceedCheckout = () => {
    if (calculateTotal() === 0) {
      setDisplayCheckoutMsg(
        `Sorry, ${store.user && store.user.firstName} ${
          store.user && store.user.lastName
        }, but you need to select something to buy it`
      );
    } else {
      console.log(store.user && store.user._id);
      setLoader(true);
      axios
        .post(
          `${process.env.REACT_APP_BASE_BACKEND}/cart/checkout-email`,
          {
            userId: store.user && store.user._id,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.user && store.user.access_token}`,
            },
          }
        )
        .then((response) => {
          setSuccess(true);
          setTimeout(() => {
            setDisplayCheckoutMsg(
              `Thank you for shopping with us, ${store.user && store.user.firstName} ${
                store.user && store.user.lastName
              } please wait for a confirmation email`
            );
            setLoader(false);
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setTimeout(() => {
            setSuccess(false);
            setDisplayCheckoutMsg("Failed to checkout");
          }, 2000);
        });
    }
  };

  const removeFromCart = (_id: string) => {
    fetch(`${process.env.REACT_APP_BASE_BACKEND}/cart/remove-product`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.user && store.user.access_token}`,
      },
      body: JSON.stringify({
        userId: store.user && store.user._id.toString(),
        productId: _id,
      }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => {
        console.log(error);
      });
    setCart(
      cart.filter((element) => {
        if ((element.productId as Product)._id === _id) {
          if (element.quantity === 1) {
            return null;
          } else {
            element.quantity = element.quantity - 1;
            return element;
          }
        } else {
          return element;
        }
      })
    );
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="cartpage">
        {cart && cart.length > 0 ? (
          <table className="cartpage__table">
            <thead>
              <tr>
                <th className="cartpage__table__head__th--id">#</th>
                <th className="cartpage__table__head__th--name">Name</th>
                <th className="cartpage__table__head__th--quantity">Qty</th>
                <th className="cartpage__table__head__th--price">Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((element) => {
                return (
                  <tr key={(element.productId as Product)._id}>
                    <td className="cartpage__table__body__td">
                      {(element.productId as Product)._id.slice(-2)}
                    </td>
                    <td className="cartpage__table__body__td">
                      {(element.productId as Product).name}
                    </td>
                    <td className="cartpage__table__body__td">{element.quantity}</td>
                    <td className="cartpage__table__body__td">
                      {(element.productId as Product).price}x{element.quantity} ={" "}
                      {((element.productId as Product).price as number) * element.quantity}
                    </td>
                    <td>
                      <button
                        className="crossbutton"
                        onClick={() => {
                          removeFromCart((element.productId as Product)._id);
                        }}
                      >
                        x
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td className="cartpage__table__body__td">
                  Total: <label className="font-bold">{calculateTotal()}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <Link className="backbutton" to="/products">
                    {"<"}
                  </Link>
                </td>
                <td></td>
                <td></td>
                <td>
                  <button className="cartbutton" onClick={() => proceedCheckout()}>
                    Checkout
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div>No items found in cart</div>
        )}
        {loader ? <Loader /> : null}
        <div
          className={
            success ? "text-center font-bold text-green-400" : "text-center font-bold text-red-400"
          }
        >
          {displayCheckoutMsg ? displayCheckoutMsg : null}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
