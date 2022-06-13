import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getUser from 'util/localStorage/getUser';
import setUser from 'util/localStorage/setUser';
import classes from './index.module.css';
import { useForm } from "react-hook-form";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const user = getUser();
    // const [conError, setConError] = useState(false);

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
                // console.log(response.data.results)
                setUser(JSON.stringify(response.data.results));
                return navigate("/home");
            })
            .catch((err) => {
                // console.log(err)
                setLoading(true);
                setTimeout(() => {
                    setError("connection", { message: err.response.data.message });
                    setLoading(false);
                }, 2000)
                // console.log(err)
            })
    };

    return (
        <div className={classes.main}>
            <h3 className={classes.header3}>Please log in to continue</h3>
            <div className={classes.main__container}>
                <div className={classes.tform}>
                    <form onSubmit={handleSubmit(onSubmission)}>
                        <div className={classes.tform__row}>
                            <div className={classes.tform__row__labelCell}>
                                Email:
                            </div>
                            <div className={classes.tform__row__inputCell}>
                                <input
                                    className={classes.tform__row__inputBox}
                                    type="text"
                                    style={errors.password ? {
                                        backgroundColor: "#f0abfc"
                                    } : null}
                                    placeholder='Email'
                                    {...register("email", { required: true })}
                                />
                            </div>
                        </div>
                        <div className={classes.tform__row}>
                            <div className={classes.tform__row__labelCell}>
                                Password:
                            </div>
                            <div className={classes.tform__row__inputCell}>
                                <input
                                    className={classes.tform__row__inputBox}
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
                                <button className={classes.main__bottom__loginBtn} onClick={() => {
                                    clearErrors()
                                }}
                                >Log In</button> : <div className={classes.loader} />}
                            <label className={classes.main__error}>
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
                            {/* <label className={classes.main__error}>
                                <p>
                                    {conError ? "Error connecting to server" : null}
                                </p>
                            </label> */}
                            <div>
                                <Link to="/reset-password-request" className={classes.main__link}>Forgot Password</Link>
                            </div>
                            <div>
                                <Link to="/register" className={classes.main__link}>Sign Up</Link>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login