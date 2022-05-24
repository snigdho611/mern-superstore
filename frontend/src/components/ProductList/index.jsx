import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import classes from './index.module.css'
import { useDispatch } from 'react-redux';

const ProductList = () => {
    // Data
    const [allData, setAllData] = useState([]);
    const [btnCount, setBtnCount] = useState({
        count: 0,
        range: []
    });
    const [dataToShow, setDataToShow] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(false);

    // Search
    const [search, setSearch] = useState({
        status: false,
        params: "",
        category: "id"
    })

    // Cart
    const dispatch = useDispatch();

    // Use effect for initial data loading and storing
    useEffect(() => {
        fetch(process.env.REACT_APP_ALL_PRODUCTS, { method: "GET" })
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
                setLoading(false);
            })
            .catch((err) => {
                setAllData([]);
                setDataToShow([]);
                setLoadingError(true);
            });
    }, []);

    // Use Effect for searching
    useEffect(() => {
        const handleSearch = () => {
            const regex = RegExp(search.params);
            const result = allData.filter((e) => {
                return regex.test(e[search.category]);
            });
            // console.log(regex)
            if (result === []) {
                console.log("Not found");
                setDataToShow([]);
            } else {
                setDataToShow(result);
            }
        };
        if (search.status) {
            setDataToShow([]);
            handleSearch();
        } else {
            setDataToShow(allData.slice(0, 8));
        }
    }, [search.params, search.category, search.status, allData]);

    // Use Effect for button range changes
    useEffect(() => {
    }, [btnCount.range])

    const startSearching = (value) => {
        if (value !== "") {
            setSearch(prevState => ({ ...prevState, status: true }));
            setSearch(prevState => ({ ...prevState, params: value }))
            setDataToShow([]);
        } else {
            setSearch(prevState => ({ ...prevState, status: false }))
        }
    };

    const addToCart = (data) => {
        dispatch({ type: "add", payLoad: { id: data.id, name: data.name, price: data.price, count: 1 } })
    }

    const paginateChange = (index) => {
        setDataToShow(allData.slice((index + 1) * 8 - 8, (index + 1) * 8));
    };

    const paginateInc = () => {
        if (btnCount.range[0] !== 0) {
            setBtnCount(prevState => ({ ...prevState, range: [btnCount.range[0] - 1, btnCount.range[1] - 1] }))
        }
    }

    const paginateDec = () => {
        if (btnCount.range[1] !== btnCount.count) {
            setBtnCount(prevState => ({ ...prevState, range: [prevState.range[0] + 1, prevState.range[1] + 1] }))
        }
    }

    return (
        <div className={classes.main}>
            <div className={classes.main__child}>
                <div className={classes.main__search}>
                    <div className={classes.search_radio}>
                        <input
                            type="radio"
                            value="id"
                            defaultChecked
                            onChange={(e) => {
                                setSearch(prevState => ({ ...prevState, category: e.target.value }))
                            }}
                            name="category"
                        />
                        ID
                        <input
                            type="radio"
                            value="name"
                            name="category"
                            onChange={(e) => {
                                setSearch(prevState => ({ ...prevState, category: e.target.value }))
                            }}
                        />
                        Name
                        <input
                            type="radio"
                            value="type"
                            name="category"
                            onChange={(e) => {
                                setSearch(prevState => ({ ...prevState, category: e.target.value }))
                            }}
                        />
                        Type
                    </div>
                    <div>
                        <input
                            type="text"
                            onChange={(e) => {
                                startSearching(e.target.value)
                            }}
                            className={classes.main__search__input}
                        />
                    </div>
                </div>
            </div>
            {!loading ? <div className={classes.list}>
                {dataToShow.map((element) => {
                    return <ProductCard key={element.id} name={element.name} price={100} data={element} dispatchMethod={addToCart} />;
                })}
            </div> : <div className={classes.loader} />}
            {loadingError ? <div>Error loading data</div> : null}
            {!search.status && <div className={classes.main__pagination}>
                {<button
                    className={classes.main__pagination__btn}
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
                            return <button className={classes.main__pagination__btn} key={i} value={i} onClick={() => paginateChange(i)}>{i + 1}</button>;
                        } else {
                            return null
                        }
                    })}
                <button
                    className={classes.main__pagination__btn}
                    style={btnCount.range[1] !== btnCount.count ? null : { backgroundColor: "gray", color: "azure" }}
                    onClick={btnCount.range[1] !== btnCount.count ? () => { paginateDec() } : null}>
                    {">"}
                </button>
            </div>}
        </div>
    )
}

export default ProductList