import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import getUser from 'util/localStorage/getUser';
import classes from './index.module.css'

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const user = getUser();

    useEffect(() => {
        if (user) {
            navigate('/home')
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
        setLoading(true)
        axios.post(`${process.env.REACT_APP_BASE_BACKEND}/auth/reset-password-email`,
            {
                email: formData.email
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(() => {
                // console.log(response.data.results)
                // setUser(JSON.stringify(response.data.results));
                // return navigate("/home");
                setSuccess(true)
                setLoading(false)
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

    return (
        <div className={classes.Form}>
            <h3 className={classes.Form__header3}>Please enter your email</h3>
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
                                    type="email"
                                    style={errors.password ? {
                                        backgroundColor: "#f0abfc"
                                    } : null}
                                    placeholder='Email'
                                    {...register("email", {
                                        required: { value: true, message: "Please enter an email" },
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "invalid email address"
                                        }
                                    })}
                                />
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {!loading ? <button className={classes.Form__bottom__loginBtn} onClick={() => {
                                clearErrors()

                            }}
                            >Submit</button> : <div className={classes.loader} />}
                            <label className={classes.Form__success}>
                                <p>
                                    {
                                        success ? "Please check your email!" : null
                                    }
                                </p>
                            </label>
                            <label className={classes.Form__error}>
                                <p>
                                    {
                                        errors.email ? "Please enter an email" : null
                                    }
                                </p>
                                <p>
                                    {
                                        errors.connection ? errors.connection.message : null
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

export default ForgotPassword