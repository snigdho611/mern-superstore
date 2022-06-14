import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getUser from 'util/localStorage/getUser';
import setUser from 'util/localStorage/setUser';
import classes from './index.module.css';
import { useForm } from "react-hook-form";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const user = getUser();

    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [navigate, user])

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm();

    const [conError, setConError] = useState(false);

    const onSubmission = formData => {
        console.log(formData)
        if (formData.password !== formData.confirmPassword) {
            // errors.push()
            setError("confirmPassword", { type: "custom", message: "Passwords do not match" });
            return;
        }
        setLoading(true)

        axios.post(`${process.env.REACT_APP_BASE_BACKEND}/auth/signup`,
            {
                ...formData
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                setLoading(true);
                setTimeout(() => {
                    console.log(response.data.results)
                    setUser(JSON.stringify(response.data.results));
                    setLoading(false);
                    setSuccess(true);
                }, 2000)
            })
            .catch((err) => {
                console.log(err)
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setConError(true);
                }, 2000)
                console.log(err)
            })

    };

    // const navigate = useNavigate();
    // const user = getUser();
    // useEffect(() => {
    //     if (user) {
    //         // navigate("/home");
    //     }
    // }, [user, navigate])

    return (
        <div className={classes.Form}>
            <h3 className={classes.Form__header3}>Please sign up to continue</h3>
            <div className={classes.Form__container}>
                <div className={classes.Form__container__grid}>
                    <form onSubmit={handleSubmit(onSubmission)}>
                        <div className={classes.Form__container__grid__row}>
                            <div className={classes.Form__container__grid__row__labelCell}>
                                First name:
                            </div>
                            <div className={classes.Form__container__grid__row__inputCell}>
                                <input
                                    className={classes.Form__container__grid__row__inputBox}
                                    style={errors.firstName ? {
                                        backgroundColor: "#f0abfc", color: "#134e4a"
                                    } : null}
                                    type="text"
                                    placeholder='First name'
                                    {...register("firstName", {
                                        required: { value: true, message: "First name is required" }, pattern: {
                                            value: /^[A-Z a-z]+$/i,
                                            message: "Names must only be alphabetical or contain space"
                                        }
                                    })}
                                />

                                <label className={classes.Form__error}>
                                    {errors.firstName ? errors.firstName.message : null}
                                </label>

                            </div>
                        </div>
                        <div className={classes.Form__container__grid__row}>
                            <div className={classes.Form__container__grid__row__labelCell}>
                                Last name:
                            </div>
                            <div className={classes.Form__container__grid__row__inputCell}>
                                <input
                                    className={classes.Form__container__grid__row__inputBox}
                                    style={errors.lastName ? {
                                        backgroundColor: "#f0abfc", color: "#134e4a"
                                    } : null}
                                    type="text"
                                    placeholder='Last name'
                                    {...register("lastName", {
                                        required: { value: true, message: "Last name is required" }, pattern: {
                                            value: /^[A-Z a-z]+$/i,
                                            message: "Names must only be alphabetical or contain space"
                                        }
                                    })}
                                />
                                <label className={classes.Form__error}>
                                    {errors.lastName ? errors.lastName.message : null}
                                </label>

                            </div>
                        </div>
                        <div className={classes.Form__container__grid__row}>
                            <div className={classes.Form__container__grid__row__labelCell}>
                                Phone:
                            </div>
                            <div className={classes.Form__container__grid__row__inputCell}>
                                <input
                                    className={classes.Form__container__grid__row__inputBox}
                                    style={errors.phone ? {
                                        backgroundColor: "#f0abfc", color: "#134e4a"
                                    } : null}
                                    type="text"
                                    placeholder='Phone'
                                    {...register("phone", {
                                        required: { value: true, message: "Phone number is required" },
                                        pattern: {
                                            value: /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
                                            message: "Invalid number format"
                                        }
                                    })}
                                />
                                <label className={classes.Form__error}>
                                    {errors.phone ? errors.phone.message : null}
                                </label>
                            </div>
                        </div>
                        <div className={classes.Form__container__grid__row}>
                            <div className={classes.Form__container__grid__row__labelCell}>
                                Email:
                            </div>
                            <div className={classes.Form__container__grid__row__inputCell}>
                                <input
                                    className={classes.Form__container__grid__row__inputBox}
                                    style={errors.email ? {
                                        backgroundColor: "#f0abfc", color: "#134e4a"
                                    } : null}
                                    type="text"
                                    placeholder='Email'
                                    {...register("email", {
                                        required: { value: true, message: "Please enter an email" },
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "invalid email address"
                                        }
                                    })}
                                />
                                <label className={classes.Form__error}>
                                    {errors.email ? errors.email.message : null}
                                </label>
                            </div>
                        </div>
                        <div className={classes.Form__container__grid__row}>
                            <div className={classes.Form__container__grid__row__labelCell}>
                                Password:
                            </div>
                            <div className={classes.Form__container__grid__row__inputCell}>
                                <input
                                    className={classes.Form__container__grid__row__inputBox}
                                    style={errors.password ? {
                                        backgroundColor: "#f0abfc", color: "#134e4a"
                                    } : null}
                                    type="password"
                                    placeholder='Password'
                                    {...register("password", {
                                        required: { value: true, message: "Please enter your password" },
                                        pattern: {
                                            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                                            message: "8 characters, a number, a capital and a small"
                                        }
                                    })}
                                />
                                <label className={classes.Form__error}>
                                    {errors.password ? errors.password.message : null}
                                </label>
                            </div>
                        </div>
                        <div className={classes.Form__container__grid__row}>
                            <div className={classes.Form__container__grid__row__labelCell}>
                                Confirm Password:
                            </div>
                            <div className={classes.Form__container__grid__row__inputCell}>
                                <input
                                    className={classes.Form__container__grid__row__inputBox}
                                    style={errors.confirmPassword ? {
                                        backgroundColor: "#f0abfc", color: "#134e4a"
                                    } : null}
                                    type="password"
                                    placeholder='Re-enter Password'
                                    {...register("confirmPassword", {
                                        required: {
                                            value: true,
                                            message: "Please enter your password again"
                                        }, pattern: {
                                            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                                            message: "8 characters, a number, a capital and a small"
                                        }
                                    })}
                                />
                                <label className={classes.Form__error}>
                                    {errors.confirmPassword ? errors.confirmPassword.message : null}
                                </label>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {!loading ? <button className={classes.Form__bottom__loginBtn} onClick={() => {
                                clearErrors()
                            }}
                            >Sign Up</button> : <div className={classes.loader} />}
                            <label className={classes.Form__error}>
                                <p>
                                    {/* {errors && Object.keys(errors).length ? errors[Object.keys(errors)[0]].message : null}
                                    {console.log(errors)} */}
                                    {conError ? "Error connecting to server" : null}
                                </p>
                            </label>
                            <label className={classes.Form__success}>
                                <p>
                                    {
                                        success ? "Successfully signed up, please check your email" : null
                                    }
                                </p>
                                <p>
                                    {
                                        success ? "You can now log in" : null
                                    }
                                </p>
                            </label>
                            <div>
                                <Link to="/" className={classes.Form__link}>Log In</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login