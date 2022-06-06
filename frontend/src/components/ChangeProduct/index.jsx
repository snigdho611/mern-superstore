import { useEffect, useState } from "react";
import classes from "./index.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";

const ChangeProduct = () => {
    const [success, setSuccess] = useState(false);
    const { productId } = useParams()
    const [product, setProduct] = useState();
    // const user = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))[0] ? JSON.parse(localStorage.getItem("user"))[0] : {};

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_BACKEND}/products/${productId}`)
            .then((response) => {
                // console.log(response)
                setProduct(response.data.results);
            }).catch((error) => {
                console.log(error)
            })
    }, [productId])
    const {
        register, reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            description: "",
            image: "",
            price: "",
            weight: "",
        }
    });

    useEffect(() => {
        reset({
            name: product && product.name ? product.name : "",
            description: product && product.description ? product.description : "",
            image: product && product.image ? product.image : "",
            price: product && product.price ? product.price : "",
            weight: product && product.weight ? product.weight : "",
        })
    }, [product, reset])



    // const [allUserData, setAllUserData] = useState([]);

    const onSubmit = (data) => {
        // setAllUserData([...allUserData, data]);
        const editData = {
            ...data,
            productId: productId,
            type: product.type
        }
        axios.put(`${process.env.REACT_APP_BASE_BACKEND}/admin/products/edit`, editData)
            .then((response) => {
                console.log(response)
                // setProduct(response.data.results);
            }).catch((error) => {
                console.log(error)
            })
        setSuccess(true);
        // const uploadData = data;
        // uploadData.dob = JSON.stringify(uploadData.dob);
        // localStorage.setItem("user", [JSON.stringify([uploadData])])
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "50%",
                margin: "0 auto",
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)} className={classes.main}>
                <input
                    {...register("name", {
                        required: { value: true, message: "Name is required" },
                        pattern: {
                            value: /^[A-Z a-z0-9±()]+$/i,
                            message: "Only alphabetical characters or spaces are allowed",
                        },
                    })}
                    className={classes.main__input}
                    type="text"
                    placeholder="Name"
                />
                <div style={{ color: "red" }}>{errors.name ? errors.name.message : null}</div>
                <input
                    {...register("description", {
                        required: { value: true, message: "Description is required" },
                        pattern: {
                            value: /^[A-Z a-z.0-9,]+$/i,
                            message: "Only alphabetical characters or spaces are allowed",
                        },
                    })}
                    className={classes.main__input}
                    type="text"
                    placeholder="Description"
                />
                <div style={{ color: "red" }}>{errors.description ? errors.description.message : null}</div>
                <input
                    {...register("price", {
                        required: { value: true, message: "Price is required" },
                        pattern: {
                            value: /^[0-9]+$/i,
                            message: "Price must be numeric",
                        },
                    })}
                    className={classes.main__input}
                    type="text"
                    placeholder="Price"
                />
                <div style={{ color: "red" }}>{errors.price ? errors.price.message : null}</div>
                <input
                    {...register("weight", {
                        required: { value: true, message: "Weight is required" },
                        pattern: {
                            value: /^[A-Z a-z0-9]+$/i,
                            message: "Only alphabetical characters or spaces are allowed",
                        },
                    })}
                    className={classes.main__input}
                    type="text"
                    placeholder="Weight"
                />
                <div style={{ color: "red" }}>{errors.weight ? errors.weight.message : null}</div>
                <input
                    {...register("image", {
                        required: { value: true, message: "Image link is required" },
                    })}
                    className={classes.main__input}
                    type="text"
                    placeholder="Image"
                />
                <div style={{ color: "red" }}>{errors.image ? errors.image.message : null}</div>

                <button
                    className={classes.main__submitBtn}
                    type="submit"
                >
                    Submit
                </button>
                {success ? <label style={{ margin: "0 auto", color: "green" }}>Success!</label> : null}
            </form>
        </div>
    );
};

export default ChangeProduct;
