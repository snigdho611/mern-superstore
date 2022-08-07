import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getUser from 'util/local/getUser';
import classes from './index.module.css';
import { useForm } from "react-hook-form";
import { setUser } from 'util/local';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const user = getUser();

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [navigate, user])

    const onSubmission = formData => {
        axios.post(`${process.env.REACT_APP_BASE_BACKEND}/auth/login`,
            {
                email: formData.email,
                password: formData.password
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log(response.data.results)
                // setSuccess(true);
                // setUserData(JSON.stringify(response.data.results));
                setUser(JSON.stringify(response.data.results))
                saveAndRedirect()
                // setUser();
            })
            .catch((err) => {
                setLoading(true);
                if (err.code === "ERR_NETWORK") {
                    setError("connection", { message: "Could not connect to network" });
                    setLoading(false);
                    return;
                }
                setTimeout(() => {
                    setError("connection", { message: err.response.data.message });
                    setLoading(false);
                }, 2000)
            })
    };

    const saveAndRedirect = () => {
        navigate("/home");
    }

    return (
        <div className={classes.Form}>
            <h3 className={classes.Form__header3}>Please log in to continue</h3>
            <div className={classes.Form__container}>
                <div className={classes.Form__container__grid}>
                    <form onSubmit={handleSubmit(onSubmission)}>
                        <div className={classes.Form__container__grid__row}>
                            <div className={classes.Form__container__grid__row__labelCell}>
                                Email:
                            </div>
                            <div className={classes.Form__container__grid__row__inputCell}>
                                <input
                                    className={classes.Form__container__grid__row__inputBox}
                                    type="text"
                                    style={errors.password ? {
                                        backgroundColor: "#f0abfc"
                                    } : null}
                                    placeholder='Email'
                                    {...register("email", { required: true })}
                                />
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
                                        backgroundColor: "#f0abfc"
                                    } : null}
                                    type="password"
                                    placeholder='Password'
                                    {...register("password", { required: true })}
                                />
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {!loading ?
                                <button className={classes.Form__bottom__loginBtn} onClick={() => {
                                    clearErrors()
                                }}
                                >Log In</button> : <div className={classes.loader} />}
                            <label className={classes.Form__error}>
                                <p>
                                    {
                                        errors.email || errors.password ?
                                            "One of the fields is empty"
                                            : null
                                    }
                                </p>
                                <p>
                                    {
                                        errors.connection ? errors.connection.message : null
                                    }
                                </p>
                            </label>
                            <div>
                                <Link to="/reset-password-request" className={classes.Form__link}>Forgot Password</Link>
                            </div>
                            <div>
                                <Link to="/register" className={classes.Form__link}>Sign Up</Link>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login