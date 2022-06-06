import { useEffect, useState } from "react";
import classes from "./index.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddProduct = () => {
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            description: "",
            image: "",
            price: "",
            weight: "",
            type: ""
        }
    });

    const onSubmit = (data) => {
        axios.post(`${process.env.REACT_APP_BASE_BACKEND}/admin/products/add`, data)
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        setSuccess(true);
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
                <input
                    {...register("type", {
                        required: { value: true, message: "Type is required" },
                        pattern: {
                            value: /^[A-Z a-z]+$/i,
                            message: "Only alphabetical characters or spaces are allowed",
                        }
                    })}
                    className={classes.main__input}
                    type="text"
                    placeholder="Type"
                />
                <div style={{ color: "red" }}>{errors.type ? errors.type.message : null}</div>

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

export default AddProduct;
