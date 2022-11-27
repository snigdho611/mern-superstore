import axios from "axios";
import Footer from "components/Footer";
import Header from "components/Header";
import Loader from "components/Loader";
import Navbar from "components/Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "util/local/index";
import { CartItem, Product } from "types/index";

const Cart = () => {
  const user = getUser();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [success, setSuccess] = useState<Boolean>(false);
  const [displayCheckoutMsg, setDisplayCheckoutMsg] = useState<string>();
  const [loader, setLoader] = useState<Boolean>(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_BACKEND}/cart/get`, {
      method: "POST",
      body: JSON.stringify({
        userId: user && user._id.toString(),
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user && user.access_token}`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.length]);

  const calculateTotal = () => {
    const total = cart.reduce((accumulator, object) => {
      return accumulator + (object.price as number) * object.quantity;
    }, 0);
    return total;
  };

  const proceedCheckout = () => {
    if (calculateTotal() === 0) {
      setDisplayCheckoutMsg(
        `Sorry, ${user && user.firstName} ${
          user && user.lastName
        }, but you need to select something to buy it`
      );
    } else {
      console.log(user && user._id);
      setLoader(true);
      axios
        .post(
          `${process.env.REACT_APP_BASE_BACKEND}/cart/checkout-email`,
          {
            userId: user && user._id,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${user && user.access_token}`,
            },
          }
        )
        .then((response) => {
          setSuccess(true);
          setTimeout(() => {
            setDisplayCheckoutMsg(
              `Thank you for shopping with us, ${user && user.firstName} ${
                user && user.lastName
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
        Authorization: `Bearer ${user && user.access_token}`,
      },
      body: JSON.stringify({
        userId: user && user._id.toString(),
        productId: _id,
      }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="w-2/3 mx-80 mt-28">
        <table className="w-full">
          <thead>
            <tr>
              <th className="bg-blue-700 text-blue-100 text-lg w-[10%]">#</th>
              <th className="bg-blue-700 text-blue-100 text-lg w-[40%]">Name</th>
              <th className="bg-blue-700 text-blue-100 text-lg w-[20%]">Qty</th>
              <th className="bg-blue-700 text-blue-100 text-lg w-[30%]">Price</th>
            </tr>
          </thead>
          <tbody>
            {cart &&
              cart.map((element) => {
                return (
                  <tr key={(element.productId as Product)._id}>
                    <td className="text-center bg-blue-300 border-2 border-solid border-blue-900">
                      {(element.productId as Product)._id.slice(-2)}
                    </td>
                    <td className="text-center bg-blue-300 border-2 border-solid border-blue-900">
                      {(element.productId as Product).name}
                    </td>
                    <td className="text-center bg-blue-300 border-2 border-solid border-blue-900">
                      {element.quantity}
                    </td>
                    <td className="text-center bg-blue-300 border-2 border-solid border-blue-900">
                      {(element.productId as Product).price}x{element.quantity} ={" "}
                      {((element.productId as Product).price as number) * element.quantity}
                    </td>
                    <td>
                      <button
                        className="text-blue-100 bg-red-600 cursor-pointer px-4 py-2 transition-colors hover:bg-pink-300 hover:text-blue-900"
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
              <td className="text-center bg-blue-300 border-2 border-solid border-blue-900">
                Total: <label className="font-bold">{calculateTotal()}</label>
              </td>
            </tr>
            <tr>
              <td>
                <Link
                  className="cursor-pointer bg-blue-800 font-bold text-blue-100 rounded-xl p-3 w-full transition-colors hover:bg-blue-400 hover:text-blue-800"
                  to="/products"
                >
                  {"<="}
                </Link>
              </td>
              <td></td>
              <td></td>
              <td>
                <button
                  className="cursor-pointer bg-blue-800 font-bold text-blue-100 rounded-xl w-full h-[40px] transition-colors hover:bg-blue-400 hover:text-blue-800"
                  onClick={() => proceedCheckout()}
                >
                  Checkout
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
