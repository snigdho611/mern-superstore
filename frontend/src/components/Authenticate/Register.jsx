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

    const onSubmission = formData => {
        // console.log(formData)
        axios.post(`${process.env.REACT_APP_BASE_BACKEND}/signup`,
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
                    setError("connection", { message: err.response.data.message });
                    setLoading(false);
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
        <div className={classes.main}>
            <h3 className={classes.header3}>Please sign up to continue</h3>
            <div className={classes.main__container}>
                <div className={classes.tform}>
                    <form onSubmit={handleSubmit(onSubmission)}>
                        <div className={classes.tform__row}>
                            <div className={classes.tform__row__labelCell}>
                                First name:
                            </div>
                            <div className={classes.tform__row__inputCell}>
                                <input
                                    className={classes.tform__row__inputBox}
                                    style={errors.firstName ? {
                                        backgroundColor: "#f0abfc"
                                    } : null}
                                    type="text"
                                    placeholder='First name'
                                    {...register("firstName", { required: true })}
                                />
                            </div>
                        </div>
                        <div className={classes.tform__row}>
                            <div className={classes.tform__row__labelCell}>
                                Last name:
                            </div>
                            <div className={classes.tform__row__inputCell}>
                                <input
                                    className={classes.tform__row__inputBox}
                                    style={errors.lastName ? {
                                        backgroundColor: "#f0abfc"
                                    } : null}
                                    type="text"
                                    placeholder='Last name'
                                    {...register("lastName", { required: true })}
                                />
                            </div>
                        </div>
                        <div className={classes.tform__row}>
                            <div className={classes.tform__row__labelCell}>
                                Phone:
                            </div>
                            <div className={classes.tform__row__inputCell}>
                                <input
                                    className={classes.tform__row__inputBox}
                                    style={errors.phone ? {
                                        backgroundColor: "#f0abfc"
                                    } : null}
                                    type="text"
                                    placeholder='Phone'
                                    {...register("phone", { required: true })}
                                />
                            </div>
                        </div>
                        <div className={classes.tform__row}>
                            <div className={classes.tform__row__labelCell}>
                                Email:
                            </div>
                            <div className={classes.tform__row__inputCell}>
                                <input
                                    className={classes.tform__row__inputBox}
                                    style={errors.email ? {
                                        backgroundColor: "#f0abfc"
                                    } : null}
                                    type="text"
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
                        <div className={classes.tform__row}>
                            <div className={classes.tform__row__labelCell}>
                                Confirm Password:
                            </div>
                            <div className={classes.tform__row__inputCell}>
                                <input
                                    className={classes.tform__row__inputBox}
                                    style={errors.confirmPassword ? {
                                        backgroundColor: "#f0abfc"
                                    } : null}
                                    type="confirmPassword"
                                    placeholder='Re-enter Password'
                                    {...register("confirmPassword", { required: true })}
                                />
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {!loading ? <button className={classes.main__bottom__loginBtn} onClick={() => {
                                clearErrors()

                            }}
                            >Sign Up</button> : <div className={classes.loader} />}
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
                            <label className={classes.main__success}>
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
                                <Link to="/" className={classes.main__link}>Log In</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login