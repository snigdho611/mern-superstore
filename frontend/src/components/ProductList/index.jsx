import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import classes from './index.module.css'
import { useDispatch } from 'react-redux';

const ProductList = () => {
    const [allData, setAllData] = useState([]);
    const [btnCount, setBtnCount] = useState({
        count: 0,
        range: []
    });
    const [dataToShow, setDataToShow] = useState([]);

    // const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(process.env.REACT_APP_LARAVEL_API, { method: "GET" })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setAllData(response);
                setBtnCount(prevState => ({
                    ...prevState,
                    count: Math.ceil(response.length / 8),
                    range: [0, 3]
                }));
                setDataToShow(response.slice(0, 8));
            })
            .catch((err) => {
                setAllData([]);
                setDataToShow([]);
            });
    }, []);

    const paginateChange = (index) => {
        setDataToShow(allData.slice((index + 1) * 8 - 8, (index + 1) * 8));
    };

    useEffect(() => {
    }, [btnCount.range])

    const addToCart = (data) => {
        dispatch({ type: "add", payLoad: { id: data.id, name: data.name, price: data.price, count: 1 } })
    }

    const paginateInc = () => {
        if (btnCount.range[0] === 0) {
            //
        } else {
            setBtnCount(prevState => ({ ...prevState, range: [btnCount.range[0] - 1, btnCount.range[1] - 1] }))
            console.log(btnCount);

        }
    }

    const paginateDec = () => {
        if (btnCount.range[1] === btnCount.count) {
        } else {
            setBtnCount(prevState => ({ ...prevState, range: [prevState.range[0] + 1, prevState.range[1] + 1] }))
            console.log(btnCount);

        }
    }

    return (
        <div className={classes.main}>
            <div className={classes.list}>
                {dataToShow.map((element) => {
                    return <ProductCard key={element.id} name={element.name} price={100} data={element} dispathMethod={addToCart} />;
                })}
            </div>
            <div className={classes.pagination}>
                {<button
                    className={classes.pagination_btn}
                    style={btnCount.range[0] !== 0 ? null : { backgroundColor: "gray", color: "azure" }}
                    onClick={btnCount.range[0] !== 0 ?
                        () => { paginateInc() }
                        : null}>
                    {"<"}
                </button>}
                {Array(btnCount.count)
                    .fill()
                    .map((_, i) => {
                        if (i >= btnCount.range[0] && i < btnCount.range[1]) {
                            return <button className={classes.pagination_btn} key={i} value={i} onClick={() => paginateChange(i)}>{i + 1}</button>;
                        } else {
                            return null
                        }
                    })}
                <button
                    className={classes.pagination_btn}
                    style={btnCount.range[1] !== btnCount.count ? null : { backgroundColor: "gray", color: "azure" }}
                    onClick={btnCount.range[1] !== btnCount.count ? () => { paginateDec() } : null}>
                    {">"}
                </button>
            </div>
        </div>
    )
}

export default ProductList