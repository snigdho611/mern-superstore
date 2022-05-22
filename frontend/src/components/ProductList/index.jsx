import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import classes from './index.module.css'

const ProductList = () => {
    const [allData, setAllData] = useState();
    const [btnCount, setBtnCount] = useState(0);
    const [dataToShow, setDataToShow] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_PRODUCT_API, { method: "GET" })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setAllData(response);
                setBtnCount(Math.ceil(response.length / 8));
                setDataToShow(response.slice(0, 8));
            })
            .catch((err) => {
                setAllData([]);
                setDataToShow([]);
            });
    }, []);

    const paginateChange = (index) => {
        setDataToShow(allData.slice((index + 1) * 8 - 8, (index + 1) * 8));
        // console.log((index + 1) * 5 - 5, (index + 1) * 5);
    };


    return (
        <div className={classes.main}>
            <div className={classes.list}>
                {dataToShow.map((element) => {
                    return <ProductCard key={element.id} title={element.title} price={100} data={element} />;
                })}
            </div>
            <div className={classes.pagination}>
                {Array(btnCount)
                    .fill()
                    .map((_, i) => {
                        return <button key={i} value={i} onClick={() => paginateChange(i)}>{i + 1}</button>;
                    })}
            </div>
        </div>
    )
}

export default ProductList