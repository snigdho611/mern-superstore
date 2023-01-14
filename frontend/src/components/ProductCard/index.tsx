import React from "react";
import { Link } from "react-router-dom";
// import { getUser } from "util/local/index";
import "./index.scss";

interface ProductCardProps {
  data: any;
  dispatchMethod: any;
  deleteProduct?: (objectId: string) => void;
  addToCart?: (objectId: string) => void;
  isAdmin: boolean;
}
const ProductCard: React.FC<ProductCardProps> = ({
  data,
  dispatchMethod,
  deleteProduct,
  addToCart,
  isAdmin,
}) => {
  // const user = getUser();
  // const user_type = user && user.isAdmin ? user.isAdmin : null;

  return (
    <div className="productcard">
      <div className="productcard__img">
        <img
          className="h-36"
          src={
            data.image
              ? `${process.env.REACT_APP_BASE_BACKEND}${data.image.replace(/\\/g, "/")}`
              : "https://www.tazzadesign.com/wp-content/uploads/sites/65/2013/11/dummy-image-square-300x300.jpg"
          }
          alt="Not found"
        />
      </div>
      <div className="productcard__name">
        {data.name.length < 15 ? data.name : data.name.slice(0, 15) + "..."}
      </div>
      <div className="productcard__dateprice">
        <div className="productcard__dateprice__price">BDT {data.price}</div>
        <div className="productcard__dateprice__weight">Wt: {data.weight}</div>
      </div>
      <div className="productcard__buttons">
        {!isAdmin ? (
          <>
            <button
              onClick={() => {
                addToCart?.(data._id);
                // console.log(data);
                // dispatchMethod({
                //   _id: data._id,
                //   name: data.name,
                //   price: data.price,
                //   quantity: data.quantity,
                // });
              }}
              className="productcard__buttons__button"
            >
              Add to Cart
            </button>
          </>
        ) : null}
        {isAdmin ? (
          <Link to={`/product/edit/${data._id}`} className="productcard__buttons__button">
            Edit
          </Link>
        ) : null}
        {isAdmin ? (
          <button
            onClick={() => {
              deleteProduct?.(data._id);
            }}
            className="productcard__buttons__button"
          >
            Delete
          </button>
        ) : null}
        <Link to={`/product/${data._id}`} className="productcard__buttons__button">
          Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
