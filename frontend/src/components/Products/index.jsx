import React, { useEffect, useState } from 'react'
import classes from './index.module.css';

const Products = () => {
    const [allData, setAllData] = useState([]);
    const [dataToShow, setDataToShow] = useState([]);
    const [btnCount, setBtnCount] = useState(0);
    const [loadingData, setLoadingData] = useState(false);
    const [searchCategory, setSearchCategory] = useState("id");
    const [searchingParam, setSearchingParam] = useState("");
    const [searching, setSearching] = useState(false);

    const [productBody, setProductBody] = useState("");

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts`, { method: "GET" })
            .then((response) => { return response.json() })
            .then((data) => {
                setAllData(data);
                setDataToShow(data.slice(0, 10));
                setBtnCount(Math.ceil(data.length / 10));
            })
            .catch((err) => {
                console.log(err)
                setDataToShow(null)
                setLoadingData(true)
            })
    }, [])

    useEffect(() => {
        setBtnCount(Math.ceil(allData.length / 10))
    }, [allData, dataToShow])


    useEffect(() => {
        const handleSearch = () => {
            const regex = RegExp(searchingParam);
            const result = allData.filter((e) => {
                return regex.test(e[searchCategory]);
            });
            console.log(result);
            if (result === []) {
                console.log("Not found");
                setDataToShow([]);
            } else {
                setDataToShow(result);
            }
        };
        if (searching) {
            setDataToShow([]);
            handleSearch();
        } else {
            setDataToShow(allData.slice(0, 10));
        }
    }, [searching, searchingParam, searchCategory, allData]);

    const paginateLoad = (value) => {
        console.log(((parseInt(value) - 1) * 10), parseInt(value) * 10)
        setDataToShow(allData.slice(((parseInt(value) - 1) * 10), parseInt(value) * 10))
    }

    const deleteElement = (id) => {
        setAllData(allData.filter((element) => element.id !== id))
        setDataToShow(dataToShow.filter((element) => element.id !== id))
    }

    const startSearching = (value) => {
        if (value !== "") {
            setSearching(true);
            setDataToShow([]);
            setSearchingParam(value);
        } else {
            setSearching(false);
        }
    };

    const addProduct = () => {
        const data = {
            id: allData.slice(allData.length - 1)[0].id + 1,
            title: "",
            body: productBody
        }
        setAllData(allData => [...allData, data]);
    }

    return (
        <div style={{ margin: "0 auto", width: "60%", justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <div className={classes.tradio}>
                    <input
                        className={classes.tradio}
                        type="radio"
                        value="id"
                        defaultChecked
                        onChange={(e) => {
                            setSearchCategory(e.target.value);
                        }}
                        name="category"
                    />
                    ID
                </div>
                <div className={classes.tradio}>
                    <input
                        className={classes.tradio}
                        type="radio"
                        value="body"
                        name="category"
                        onChange={(e) => {
                            setSearchCategory(e.target.value);
                        }}
                    />
                    Name
                </div>
                <input
                    type={"text"}
                    className={classes.tinput}
                    onChange={(e) => {
                        setTimeout(() => {
                            startSearching(e.target.value);
                        }, 2000);
                    }}
                />
            </div>
            <div>
                <input
                    type="text"
                    onChange={(e) => { setProductBody(e.target.value) }}
                    value={productBody}
                />
                <button onClick={() => { addProduct() }}>Add</button>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                {Array(btnCount).fill().map((_, i) => {
                    return <button value={i} onClick={(e) => { paginateLoad(parseInt(e.target.value) + 1) }} key={i} className={classes.paginateBtn}>{i + 1}</button>
                })}
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: "100%", flexWrap: "wrap", justifyContent: 'center', margin: "20px auto" }}>
                {loadingData ? <div>Failed to load request</div> : null}
                {!loadingData && dataToShow && dataToShow.length > 0 ? dataToShow.map((element, i) => {
                    return (
                        <div key={i} style={{ width: "200px", border: "1px solid white", margin: "5px", justifyContent: 'center' }}>
                            <div style={{ float: "right" }}>
                                <button onClick={() => { deleteElement(element.id) }} style={{ width: '20px', height: "20px" }}>
                                    x
                                </button>
                            </div>
                            <div style={{ width: "80%", margin: '0 auto' }}>
                                <img src="https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640" alt='not found' height={100} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <label>Product: {element.id}</label>
                                <label>{element.body.length < 50 ? element.body : element.body.slice(0, 50) + "..."}</label>
                            </div>
                        </div>)
                }) : null}
                {dataToShow && dataToShow.length === 0 ? <div>No data to show</div> : null}
            </div>
        </div>
    )
}

export default Products