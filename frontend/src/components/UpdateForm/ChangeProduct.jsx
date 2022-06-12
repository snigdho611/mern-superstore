import { useEffect, useState } from "react";
import classes from "./index.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import getUser from "util/localStorage/getUser";

const ChangeProduct = () => {
    const [success, setSuccess] = useState(false);
    const { productId } = useParams()
    const [product, setProduct] = useState();
    const [error, setError] = useState();

    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null)
    const [imageMessage, setImageMessage] = useState("");

    const user = getUser();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_BACKEND}/products/details/${productId}`)
            .then((response) => {
                setProduct(response.data.results);
                setImage(response.data.results.image);
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
            // image: product && product.image ? product.image : "",
            price: product && product.price ? product.price : "",
            weight: product && product.weight ? product.weight : "",
        })
    }, [product, reset])

    useEffect(() => {
        try {
            const extension = image && image.name ? image?.name.split(".")[1] : "";
            if (extension === "") {
                return;
            }
            if (extension !== "jpg" && extension !== "png" && extension !== "jpeg") {
                console.log("File is in the wrong format")
                setImageMessage("File is in the wrong format");
                return;
            }
            setImageURL(URL.createObjectURL(image));
            axios.post(`${process.env.REACT_APP_BASE_BACKEND}/admin/products/update-image`,
                {
                    productId: product && product._id ? product._id : null,
                    productImage: image
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${user.access_token}`
                    }
                }).then((response) => {
                    console.log(response)
                    setImageMessage("File uploaded successfully")
                })
                .catch((error) => {
                    console.log(error)
                    setImageMessage("File failed to upload")
                })
        } catch (error) {
            console.log(error)
        }
    }, [image, product, imageMessage])

    const onSubmit = (data) => {
        setSuccess(false)
        setError("")
        const editData = {
            ...data,
            productId: productId,
            type: product.type
        }
        axios.put(
            `${process.env.REACT_APP_BASE_BACKEND}/admin/products/edit`,
            editData,
            {
                headers: {
                    "Authorization": `Bearer ${user.access_token}`
                }
            }
        )
            .then((response) => {
                setSuccess(true);
                console.log(response)
            }).catch((error) => {
                setError("Failed to update")
                console.log(error)
            })
    };

    return (
        <div
            className={classes.main}
        >
            <form onSubmit={handleSubmit(onSubmit)} className={classes.main__container}>
                <div className={classes.main__imageInput}>
                    <div>
                        <img style={{ margin: "0 auto" }} src={imageURL ? imageURL :
                            product && product.image ? `${process.env.REACT_APP_BASE_BACKEND}${product.image.replace(/\\/g, "/")}` : "https://www.tazzadesign.com/wp-content/uploads/sites/65/2013/11/dummy-image-square-300x300.jpg"
                        } alt="Not found" className={classes.image} />
                        {/* {image ? "Ok" : null} */}
                    </div>
                    <div>
                        {imageMessage}
                    </div>
                    <input
                        type="file"
                        onChange={(e) => {
                            setImage(e.target.files[0])
                        }}
                        alt="Not found"
                    />
                </div>
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

                <div style={{ color: "red" }}>{errors.image ? errors.image.message : null}</div>

                <button
                    className={classes.main__bottom__loginBtn}
                >
                    Submit
                </button>
                <label className={classes.main__error}>
                    <p>
                        {!error || error !== "" ? error : null}
                    </p>
                </label>
                <label className={classes.main__success}>
                    <p>
                        {success ? "Success!" : null}
                    </p>
                </label>
            </form>
        </div>
    );
};

export default ChangeProduct;