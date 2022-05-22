import React from 'react'
import classes from './index.module.css'

const ProductCard = ({ data, dispathMethod }) => {
    // const cart = useSelector((state) => state.cart);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     console.log(cart)
    // }, [cart])


    // const addToCart = (data) => {
    //     dispatch({ type: "add", payLoad: data })
    // }

    return (
        <div
            className={classes.main}
        >
            <div>
                <img src="https://www.tazzadesign.com/wp-content/uploads/sites/65/2013/11/dummy-image-square-300x300.jpg" alt="Not found" className={classes.image} />
            </div>
            <div>
                {data.name.length < 20 ? data.name : data.name.slice(0, 20) + "..."}
            </div>
            <div>
                {data.price}
            </div>
            <div
                style={{ display: "flex", justifyContent: 'center' }}
            >
                <button onClick={() =>
                    dispathMethod(data)}
                >Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard