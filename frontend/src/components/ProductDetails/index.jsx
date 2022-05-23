import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classes from './index.module.css'

const ProductDetails = () => {
    const { productId } = useParams()
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_PRODUCT_SINGLE}/${productId}`, { method: "GET" })
            .then((response) => response.json())
            .then((response) => {
                setProductData(response[0])
            })
            .catch((err) => {
                console.log("Could not load data");
            })
    }, [productId])

    return (
        productData ?
            <div className={classes.main} >
                <div className={classes.main__data}>
                    <div className={classes.dataCell}>
                        <div className={classes.dataCell__left}>
                            ID:
                        </div>
                        <div className={classes.dataCell__right}>
                            #{productData.id}
                        </div>
                    </div>
                    <div className={classes.dataCell}>
                        <div className={classes.dataCell__left}>
                            NAME:
                        </div>
                        <div className={classes.dataCell__right}>
                            {productData.name}
                        </div>
                    </div>
                    <div className={classes.dataCell}>
                        <div className={classes.dataCell__left}>
                            WEIGHT:
                        </div>
                        <div className={classes.dataCell__right}>
                            {productData.weight}
                        </div>
                    </div>
                    <div className={classes.dataCell}>
                        <div className={classes.dataCell__left}>
                            PRICE:
                        </div>
                        <div className={classes.dataCell__right}>
                            {productData.price} BDT
                        </div>
                    </div>
                    <div className={classes.dataCell}>
                        <div className={classes.dataCell__left}>
                            TYPE:
                        </div>
                        <div className={classes.dataCell__right}>
                            {productData.type}
                        </div>
                    </div>
                    <div className={classes.dataCell}>
                        <div className={classes.dataCell__left}>
                            DESCRIPTION:
                        </div>
                        <div className={classes.dataCell__right}>
                            {productData.description}
                        </div>
                    </div>
                </div>
                <div className={classes.main__img}>
                    <img src="https://www.tazzadesign.com/wp-content/uploads/sites/65/2013/11/dummy-image-square-300x300.jpg" alt="Not found" className={classes.image} />
                </div>
            </div > : null
    )
}

export default ProductDetails