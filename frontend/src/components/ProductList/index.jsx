import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import classes from './index.module.css'
import axios from 'axios';
import getUser from 'util/localStorage/getUser';

const ProductList = () => {
    const user = getUser();

    // Data
    const [btnCount, setBtnCount] = useState({
        count: 0,
        range: []
    });
    const [currentBtn, setCurrentBtn] = useState(0);
    const [dataToShow, setDataToShow] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(false);
    const [verifyEmailError, setVerifyEmailError] = useState("");

    // Search
    const [search, setSearch] = useState({
        params: "",
        category: "name"
    })

    // Cart
    // const dispatch = useDispatch();

    // Use effect for initial data loading and storing
    useEffect(() => {
        try {
            axios.get(`${process.env.REACT_APP_BASE_BACKEND}/products/all?page=1&limit=8`)
                .then((response) => {
                    setDataToShow(response.data.results.products);
                    setOriginalData(response.data.results.products);
                    setBtnCount(prevState => (
                        {
                            ...prevState,
                            count: Math.ceil(response.data.results.total / 8),
                            range: [0, 3]
                        }))
                    // console.log(response.data.results.products)
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err)
                    setLoading(false);
                    setLoadingError(true);
                });
        } catch (error) {
            console.log("Failed to call products")
        }
    }, []);

    // Use Effect for button range changes
    useEffect(() => {
    }, [btnCount])

    // let searchTimeout
    const [searchTimeout, setSearchTimeout] = useState("");

    // const startSearching = ;
    useEffect(() => {
        clearTimeout(searchTimeout)
        if (search.params === "") {
            setDataToShow(originalData)
            return;
        }

        setSearchTimeout(setTimeout(() => {
            axios.get(`${process.env.REACT_APP_BASE_BACKEND}/products/search/${search.category}/${search.params}`)
                .then((response) => {
                    setDataToShow(response.data.results)
                })
                .catch((err) => {
                    console.log(err);
                    setDataToShow([]);
                });
        }, 2000))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search.params, search.category, originalData])



    const paginateChange = (index) => {
        // setDataToShow(allData.slice((index + 1) * 8 - 8, (index + 1) * 8));
        if (currentBtn === index) {
            return
        };
        try {
            setLoading(true)
            axios.get(`${process.env.REACT_APP_BASE_BACKEND}/products/all?page=${index + 1}&limit=8`)
                .then((response) => {
                    setDataToShow(response.data.results.products);
                    setOriginalData(response.data.results.products);
                    setBtnCount(prevState => (
                        {
                            ...prevState,
                            count: Math.ceil(response.data.results.total / 8),
                            range: [0, 3]
                        }))
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err)
                    setLoadingError(true);
                });
        } catch (error) {
            console.log("Failed to call products")
        }
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

    const addToCart = (data) => {
        try {
            if (!user.isEmailVerified) {
                console.log("Cannot add to cart, please verify email");
                setVerifyEmailError("Cannot add to cart, please verify email");
                return;
            }
            axios.post(`${process.env.REACT_APP_BASE_BACKEND}/cart/add-product`,
                {
                    userId: user._id.toString(),
                    productId: data._id
                },
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${user.access_token}`
                    }
                }).catch((error) => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const deleteProduct = (productId) => {
        try {
            setDataToShow(product => product.filter(element => element._id !== productId))
            axios.delete(`${process.env.REACT_APP_BASE_BACKEND}/admin/products/delete/${productId}`,
                {
                    headers:
                    {
                        "Authorization": `Bearer ${user.access_token}`
                    }
                }).then((response) => {
                    // console.log(response)
                    console.log(dataToShow)
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={classes.main}>
            <div className={classes.main__child}>
                <div className={classes.main__search}>
                    <div className={classes.search_radio}>
                        <input
                            type="radio"
                            value="name"
                            name="category"
                            defaultChecked
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
                                setSearch(prevState => ({ ...prevState, params: e.target.value }))
                            }}
                            value={search.params}
                            className={classes.main__search__input}
                        />
                    </div>
                </div>
            </div>
            <div style={{ color: "red", textAlign: "center" }}>{verifyEmailError}</div>

            {!loading ?
                <div className={classes.list}>
                    {dataToShow.length ? dataToShow.map((element) => {
                        return (
                            <ProductCard
                                key={element._id}
                                name={element.name}
                                price={100}
                                data={element}
                                dispatchMethod={addToCart}
                                deleteProduct={deleteProduct}
                            />
                        );
                    }) : <div>No results to show</div>}
                </div>
                : <div className={classes.loader} />}
            {loadingError ? <div style={{ textAlign: "center" }}>Error loading data</div> : null}
            {/* Refactor buttons for pagination */}
            <div className={classes.main__pagination}>
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
                            return (
                                <button
                                    className={classes.main__pagination__btn}
                                    key={i}
                                    value={i}
                                    onClick={
                                        () => {
                                            setCurrentBtn(i);
                                            paginateChange(i);
                                        }
                                    }>
                                    {i + 1}
                                </button>
                            );
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
            </div>
        </div>
    )
}

export default ProductList