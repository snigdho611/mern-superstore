import React from 'react'
import classes from './index.module.css'

const ProductCard = ({ data }) => {

    const addToCart = (data) => {
        console.log(data);
    }

    return (
        <div
            className={classes.main}
        >
            <div>
                <img src="https://www.tazzadesign.com/wp-content/uploads/sites/65/2013/11/dummy-image-square-300x300.jpg" alt="Not found" className={classes.image} />
            </div>
            <div>
                {data.title.length < 20 ? data.title : data.title.slice(0, 20) + "..."}
            </div>
            <div>
                {data.price}
            </div>
            <div
                onClick={
                    () => {
                        addToCart(data)
                    }
                }
                style={{ display: "flex", justifyContent: 'center' }}
            >
                <button>Add to Cart</button>
            </div>
        </div>
    )
}

export default ProductCard