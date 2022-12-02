import React from "react";
import { Link } from "react-router-dom";
// import { getUser } from "util/local/index";

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
    <div className="bg-blue-200 rounded-lg w-64 flex flex-col  border-blue-900 border-solid border-[1px] shadow-md shadow-blue-600 py-5">
      <div className="flex justify-center my-3">
        <img
          className="h-48"
          src={
            data.image
              ? `${process.env.REACT_APP_BASE_BACKEND}${data.image.replace(/\\/g, "/")}`
              : "https://www.tazzadesign.com/wp-content/uploads/sites/65/2013/11/dummy-image-square-300x300.jpg"
          }
          alt="Not found"
        />
      </div>
      <div className="flex justify-center border-t-2 border-b-2 border-blue-700 border-solid py-1 text-center">
        {data.name.length < 15 ? data.name : data.name.slice(0, 15) + "..."}
      </div>
      <div className="flex w-full">
        <div className="w-1/2 border-r-2 border-b-2 border-blue-700 border-solid py-1 text-center">
          BDT {data.price}
        </div>
        <div className="w-1/2 border-b-2 border-blue-700 border-solid py-1 text-center">
          Wt: {data.weight}
        </div>
      </div>
      <div className="flex flex-col justify-center">
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
              className="w-24 h-10 bg-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-colors text-sm text-blue-50 border-none cursor-pointer rounded-xl mx-auto my-1 text-center inline-flex justify-center items-center"
            >
              Add to Cart
            </button>
          </>
        ) : null}
        {isAdmin ? (
          <Link
            to={`/product/edit/${data._id}`}
            className="w-24 h-10 bg-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-colors text-sm text-blue-50 border-none cursor-pointer rounded-xl mx-auto my-1 text-center inline-flex justify-center items-center"
          >
            Edit
          </Link>
        ) : null}
        {isAdmin ? (
          <button
            onClick={() => {
              deleteProduct?.(data._id);
            }}
            className="w-24 h-10 bg-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-colors text-sm text-blue-50 border-none cursor-pointer rounded-xl mx-auto my-1 text-center inline-flex justify-center items-center"
          >
            Delete
          </button>
        ) : null}
        <Link
          to={`/product/${data._id}`}
          className="w-24 h-10 bg-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-colors text-sm text-blue-50 border-none cursor-pointer rounded-xl mx-auto my-1 text-center inline-flex justify-center items-center"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
