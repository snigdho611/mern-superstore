import React from 'react'
import { Link } from 'react-router-dom'
import getUser from 'util/localStorage/getUser';
import classes from './index.module.css'

const ProductCard = ({ data, dispatchMethod, deleteProduct }) => {
    const user = getUser();
    const user_type = user && user.isAdmin ? user.isAdmin : null;

    return (
        <div
            className={classes.main}
        >
            <div className={classes.main__child}>
                <img src={data.image ? `${process.env.REACT_APP_BASE_BACKEND}${data.image.replace(/\\/g, "/")}` : "https://www.tazzadesign.com/wp-content/uploads/sites/65/2013/11/dummy-image-square-300x300.jpg"} alt="Not found" className={classes.image} />
            </div>
            <div style={{
                display: "flex",
                justifyContent: 'center',
                borderTop: "1px solid green",
                borderBottom: "1px solid green"
            }}>
                {data.name.length < 15 ? data.name : data.name.slice(0, 15) + "..."}
            </div>
            <div style={{
                display: "flex", width: "100%"
            }}>
                <div style={{
                    width: "50%",
                    borderRight: "1px solid green",
                    borderBottom: "1px solid green",
                    padding: "5px"
                }}>
                    BDT {data.price}
                </div>
                <div style={{
                    width: "50%",
                    borderBottom: "1px solid green",
                    padding: "5px"
                }}>
                    Wt: {data.weight}
                </div>
            </div>
            <div
                className={classes.card__btnSection}
            >
                {!user.isAdmin ?
                    <button
                        onClick={() =>
                            dispatchMethod(
                                {
                                    _id: data._id,
                                    name: data.name,
                                    price: data.price,
                                    quantity: data.quantity
                                }
                            )
                        }
                        className={classes.card__add}
                    >
                        Add to Cart
                    </button>
                    : null}
                {
                    user_type ?
                        <Link
                            to={`/products/edit/${data._id}`}
                            className={classes.card__add}
                        >
                            Edit
                        </Link>
                        : null
                }
                {
                    user.isAdmin ?
                        <button
                            onClick={() => { deleteProduct(data._id) }
                            }
                            className={classes.card__add}
                        >
                            Delete
                        </button>
                        : null
                }
                <Link
                    to={`/products/${data._id}`}
                    className={classes.card__add}
                >
                    Details
                </Link>
            </div>
        </div>
    )
}

export default ProductCard