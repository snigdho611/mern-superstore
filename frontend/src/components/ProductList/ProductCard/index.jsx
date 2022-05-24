import React from 'react'
import { Link } from 'react-router-dom'
import classes from './index.module.css'

const ProductCard = ({ data, dispatchMethod }) => {

    return (
        <div
            className={classes.main}
        >
            <div className={classes.main__child}>
                <Link to={`/products/${data.id}`}>
                    <img src="https://www.tazzadesign.com/wp-content/uploads/sites/65/2013/11/dummy-image-square-300x300.jpg" alt="Not found" className={classes.image} />
                </Link>
            </div>
            <div style={{ display: "flex", justifyContent: 'center', border: "1px solid green" }}>
                {data.name.length < 15 ? data.name : data.name.slice(0, 15) + "..."}
            </div>
            <div style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "50%", border: "1px solid green", padding: "5px" }}>
                    BDT {data.price}
                </div>
                <div style={{ width: "50%", border: "1px solid green", padding: "5px" }}>
                    Wt: {data.weight}
                </div>
            </div>
            <div
                style={{ display: "flex", justifyContent: 'center' }}
            >
                <button
                    onClick={() =>
                        dispatchMethod(data)
                    }
                    className={classes.card__add}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard