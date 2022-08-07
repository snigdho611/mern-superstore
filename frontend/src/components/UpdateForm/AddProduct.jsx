import { useEffect, useState } from "react";
import classes from "./index.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import getUser from "util/local/getUser";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

const AddProduct = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState();

    const user = getUser();
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null)
    const [imageMessage, setImageMessage] = useState("");
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
        }
    })

    useEffect(() => {
        if (!user.isAdmin) {
            return navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        try {
            if (image) {

                setImageURL(URL.createObjectURL(image));
            }
        } catch (error) {
            console.log(error)
        }
    }, [image, imageMessage])

    const onSubmit = (data) => {
        const extension = image && image.name ? image?.name.split(".")[1] : "";

        if (extension !== "") {
            if (extension !== "jpg" && extension !== "png" && extension !== "jpeg") {
                console.log("File is in the wrong format")
                setImageMessage("File is in the wrong format");
                return;
            }
        }
        setSuccess(false)
        setError("")
        const addData = {
            ...data,
            type: "default",
            productImage: image
        }
        axios.post(`${process.env.REACT_APP_BASE_BACKEND}/admin/products/add`,
            addData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${user.access_token}`
                }
            }
        )
            .then((response) => {
                setSuccess(true);
                console.log(response)
            }).catch((error) => {
                try {
                    setError(error.response.data.errors[0].msg)
                } catch (error) {

                    setError("Failed to add")
                }
                console.log(error)
            })
    };

    return (
        <div
            className={classes.Form}
        >
            <form onSubmit={handleSubmit(onSubmit)} className={classes.Form__container}>
                <div className={classes.Form__imageInput}>
                    <div>
                        <img style={{ margin: "0 auto", height: "200px" }} src={imageURL ? imageURL :
                            "#"
                        } alt="No file" className={classes.image} />
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
                    className={classes.Form__input}
                    type="text"
                    placeholder="Name"
                />
                <label className={classes.Form__error}>
                    {errors.name ? errors.name.message : null}
                </label>
                <input
                    {...register("description", {
                        required: { value: true, message: "Description is required" },
                        pattern: {
                            value: /^[A-Z a-z.0-9,]+$/i,
                            message: "Only alphabetical characters or spaces are allowed",
                        },
                    })}
                    className={classes.Form__input}
                    type="text"
                    placeholder="Description"
                />
                <label className={classes.Form__error}>
                    {errors.description ? errors.description.message : null}
                </label>
                <input
                    {...register("price", {
                        required: { value: true, message: "Price is required" },
                        pattern: {
                            value: /^[0-9]+$/i,
                            message: "Price must be numeric",
                        },
                    })}
                    className={classes.Form__input}
                    type="text"
                    placeholder="Price"
                />
                <label className={classes.Form__error}>
                    {errors.price ? errors.price.message : null}
                </label>
                <input
                    {...register("weight", {
                        required: { value: true, message: "Weight is required" },
                        pattern: {
                            value: /^[A-Z a-z0-9]+$/i,
                            message: "Only alphabetical characters or spaces are allowed",
                        },
                    })}
                    className={classes.Form__input}
                    type="text"
                    placeholder="Weight"
                />
                <label className={classes.Form__error}>
                    {errors.weight ? errors.weight.message : null}
                </label>

                <button
                    className={classes.Form__loginBtn}
                >
                    Submit
                </button>
                <label className={classes.Form__error}>
                    <p>
                        {!error || error !== "" ? error : null}
                    </p>
                </label>
                <label className={classes.Form__success}>
                    <p>
                        {success ? "Success!" : null}
                    </p>
                </label>
            </form>
        </div>
    );
};

export default AddProduct;
