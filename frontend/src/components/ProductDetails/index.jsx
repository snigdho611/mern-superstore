import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './index.css'

const ProductDetails = () => {
    const { productId } = useParams()
    const [productData, setProductData] = useState(null);

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_BASE_BACKEND
            }/products/details/${productId}`)
            .then((response) => {
                setProductData(response.data.results)
            })
            .catch((err) => {
                console.log("Could not load data");
            })
    }, [productId])
    return (
        productData ?
            <div className="details">
                <div className="details__data">
                    <div className="details__dataCell">
                        <div className="details__dataCell__left">
                            ID:
                        </div>
                        <div className="details__dataCell__right">
                            #{productData.id}
                        </div>
                    </div>
                    <div className="details__dataCell">
                        <div className="details__dataCell__left">
                            NAME:
                        </div>
                        <div className="details__dataCell__right">
                            {productData.name}
                        </div>
                    </div>
                    <div className="details__dataCell">
                        <div className="details__dataCell__left">
                            WEIGHT:
                        </div>
                        <div className="details__dataCell__right">
                            {productData.weight}
                        </div>
                    </div>
                    <div className="details__dataCell">
                        <div className="details__dataCell__left">
                            PRICE:
                        </div>
                        <div className="details__dataCell__right">
                            {productData.price} BDT
                        </div>
                    </div>
                    <div className="details__dataCell">
                        <div className="details__dataCell__left">
                            TYPE:
                        </div>
                        <div className="details__dataCell__right">
                            {productData.type}
                        </div>
                    </div>
                    <div className="details__dataCell">
                        <div className="details__dataCell__left">
                            DESCRIPTION:
                        </div>
                        <div className="details__dataCell__right">
                            {productData.description}
                        </div>
                    </div>
                </div>
                <div className="details__img">
                    <img src={productData.image ? `${process.env.REACT_APP_BASE_BACKEND}${productData.image.replace(/\\/g, "/")}` : "https://www.tazzadesign.com/wp-content/uploads/sites/65/2013/11/dummy-image-square-300x300.jpg"} alt="Not found" className="image" />
                </div>
            </div > : null
    )
}

export default ProductDetails