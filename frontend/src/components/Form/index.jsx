import { useState } from "react";
import classes from "./index.module.css";
import { useForm } from "react-hook-form";

const Form = () => {
    const [success, setSuccess] = useState(false);
    const user = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))[0] ? JSON.parse(localStorage.getItem("user"))[0] : {};

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstname: user && user.firstname ? user.firstname : "",
            lastname: user && user.lastname ? user.lastname : "",
            phone: user && user.phone ? user.phone : "",
            email: user && user.email ? user.email : "",
            gender: user && user.gender ? user.gender : ""
        }
    });

    const [allUserData, setAllUserData] = useState([]);

    const onSubmit = (data) => {
        setAllUserData([...allUserData, data]);
        setSuccess(true);
        const uploadData = data;
        uploadData.dob = JSON.stringify(uploadData.dob);
        localStorage.setItem("user", [JSON.stringify([uploadData])])
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
                    {...register("firstname", {
                        required: { value: true, message: "First name is required" },
                        pattern: {
                            value: /^[A-Z a-z]+$/i,
                            message: "Only alphabetical characters or spaces are allowed",
                        },
                    })}
                    className={classes.main__input}
                    type="text"
                    placeholder="First Name"
                />
                <div style={{ color: "red" }}>{errors.firstname ? errors.firstname.message : null}</div>
                <input
                    {...register("lastname", {
                        required: { value: true, message: "Last name is required" },
                        pattern: {
                            value: /^[A-Z a-z]+$/i,
                            message: "Only alphabetical characters or spaces are allowed",
                        },
                    })}
                    className={classes.main__input}
                    type="text"
                    placeholder="Last Name"
                />
                <div style={{ color: "red" }}>{errors.lastname ? errors.lastname.message : null}</div>
                <input
                    {...register("phone", {
                        required: { value: true, message: "Phone number is required" },
                        pattern: {
                            value: /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
                            message: "Phone number must match Bangladeshi format",
                        },
                    })}
                    className={classes.main__input}
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
                    className={classes.main__input}
                    type="text"
                    placeholder="Email"
                />
                <div style={{ color: "red" }}>{errors.email ? errors.email.message : null}</div>

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

export default Form;
