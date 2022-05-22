import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import classes from './index.module.css'

const ProductList = () => {
    const [allData, setAllData] = useState();
    const [btnCount, setBtnCount] = useState({
        count: 0,
        range: []
    });
    const [dataToShow, setDataToShow] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_PRODUCT_API, { method: "GET" })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setAllData(response);
                setBtnCount(prevState => ({
                    ...prevState,
                    count: Math.ceil(response.length / 8),
                    range: [0, 8]
                }));
                setDataToShow(response.slice(0, 8));
            })
            .catch((err) => {
                setAllData([]);
                setDataToShow([]);
            });
    }, []);
    // console.log(btnCount)

    const paginateChange = (index) => {
        setDataToShow(allData.slice((index + 1) * 8 - 8, (index + 1) * 8));
        // console.log((index + 1) * 5 - 5, (index + 1) * 5);
    };

    const paginateInc = () => {
        if (btnCount.range[0] === 0) {
            //
        } else {
            setBtnCount(prevState => ({ ...prevState, range: [btnCount.range[0] - 1, btnCount.range[1] - 1] }))
            console.log(btnCount);

        }
    }

    useEffect(() => {

    }, [btnCount.range])

    const paginateDec = () => {
        // console.log("BTN")
        if (btnCount.range[0] === btnCount.count) {
            // console.log(btnCount.range);
        } else {
            setBtnCount(prevState => ({ ...prevState, range: [prevState.range[0] + 1, prevState.range[1] + 1] }))
            console.log(btnCount);

        }
    }

    return (
        <div className={classes.main}>
            <div className={classes.list}>
                {dataToShow.map((element) => {
                    return <ProductCard key={element.id} title={element.title} price={100} data={element} />;
                })}
            </div>
            <div className={classes.pagination}>
                <button onClick={() => { paginateInc() }}>{"<"}</button>
                {Array(btnCount.count)
                    .fill()
                    .map((_, i) => {
                        if (i >= btnCount.range[0] && i < btnCount.range[1]) {
                            return <button key={i} value={i} onClick={() => paginateChange(i)}>{i + 1}</button>;
                        } else {
                            return null
                        }
                    })}
                {btnCount.range[1] !== btnCount.count ? <button onClick={() => { paginateDec() }}>{">"}</button> : null}
            </div>
        </div>
    )
}

export default ProductList