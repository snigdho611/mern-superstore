import { useState } from "react";
import classes from "./index.module.css";
import { useForm } from "react-hook-form";

const Form = () => {
    const user = JSON.parse(localStorage.getItem("user"))[0];
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [allData, setAllData] = useState([]);

    const onSubmit = (data) => {
        setAllData([...allData, data]);
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
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column" }}>
                <input
                    {...register("firstName", {
                        required: { value: true, message: "First name is required" },
                        pattern: {
                            value: /^[A-Z a-z]+$/i,
                            message: "Only alphabetical characters or spaces are allowed",
                        },
                    })}
                    value={user.firstname}
                    className={classes.tinput}
                    type="text"
                    placeholder="First Name"
                />
                <div style={{ color: "red" }}>{errors.firstName ? errors.firstName.message : null}</div>
                <input
                    {...register("lastName", {
                        required: { value: true, message: "Last name is required" },
                        pattern: {
                            value: /^[A-Z a-z]+$/i,
                            message: "Only alphabetical characters or spaces are allowed",
                        },
                    })}
                    value={user.lastname}
                    className={classes.tinput}
                    type="text"
                    placeholder="Last Name"
                />
                <div style={{ color: "red" }}>{errors.lastName ? errors.lastName.message : null}</div>
                <input
                    {...register("phone", {
                        required: { value: true, message: "Phone number is required" },
                        pattern: {
                            value: /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
                            message: "Phone number must only have numbers",
                        },
                    })}
                    className={classes.tinput}
                    type="text"
                    placeholder="Phone Number"
                />
                <div style={{ color: "red" }}>{errors.phone ? errors.phone.message : null}</div>
                <div>
                    <div style={{ color: "green" }}>
                        <input checked type="radio" {...register("gender")} value="male" />
                        Male
                        <input type="radio" {...register("gender")} value="female" />
                        Female
                        <input type="radio" {...register("gender")} value="others" />
                        Others
                    </div>
                </div>
                <input
                    {...register("email", {
                        required: { value: true, message: "Email is required" },
                        pattern: {
                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            message: "Email format does not match",
                        },
                    })}
                    className={classes.tinput}
                    type="text"
                    placeholder="Email"
                />
                <div style={{ color: "red" }}>{errors.email ? errors.email.message : null}</div>
                <input
                    {...register("address", {
                        required: { value: true, message: "Address is required" },
                        minLength: { value: 15, message: "Address must be at least 15 characters" },
                    })}
                    className={classes.tinput}
                    type="date"
                    placeholder="Address"
                />
                <div style={{ color: "red" }}>{errors.address ? errors.address.message : null}</div>
                <button
                    style={{
                        width: "200px",
                        margin: "0 auto",
                        height: "30px",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Form;
