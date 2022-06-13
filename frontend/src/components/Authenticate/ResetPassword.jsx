import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import classes from './index.module.css'

const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const { token, userId } = useParams();
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm();

    const onSubmission = formData => {
        if (formData.password !== formData.confirmPassword) {
            // errors.push()
            setError("confirmPassword", { type: "custom", message: "Passwords do not match" });
            return;
        }
        setSuccess(false)
        setLoading(true)
        const requestData = {
            token: token,
            userId: userId,
            ...formData
        }
        console.log(requestData)
        axios.post(`${process.env.REACT_APP_BASE_BACKEND}/auth/reset-password`,
            {
                ...requestData
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(() => {
                // console.log(response.data.results)
                setSuccess(true)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(true);
                setTimeout(() => {
                    setError("response", { message: err.response.data.message });
                    setLoading(false);
                }, 2000)
                console.log(err)
            })
    };

    return (
        <div className={classes.main}>
            <h3 className={classes.header3}>Please create a new password</h3>
            <div className={classes.main__container}>
                <div className={classes.tform}>
                    <form onSubmit={handleSubmit(onSubmission)}>
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
                                    {...register("password", {
                                        required: { value: true, message: "Please enter your password" },
                                        pattern: {
                                            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                                            message: "8 characters, a number, a capital and a small"
                                        }
                                    })}
                                />
                            </div>
                        </div>
                        <div className={classes.tform__row}>
                            <div className={classes.tform__row__labelCell}>
                                Confirm:
                            </div>
                            <div className={classes.tform__row__inputCell}>
                                <input
                                    className={classes.tform__row__inputBox}
                                    type="password"
                                    style={errors.password ? {
                                        backgroundColor: "#f0abfc"
                                    } : null}
                                    placeholder='Confirm Password'
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
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {!loading ? <button className={classes.main__bottom__loginBtn} onClick={() => {
                                clearErrors()
                            }}
                            >Reset Password</button> : <div className={classes.loader} />}
                            <label className={classes.main__error}>
                                <p>
                                    {
                                        errors.confirmPassword || errors.password ?
                                            "One of the fields is empty"
                                            : null
                                    }
                                </p>
                                <p>
                                    {
                                        errors.response ? errors.response.message : null
                                    }
                                </p>
                            </label>
                            <label className={classes.main__success}>
                                <p>
                                    {
                                        success ? "Successfully changed password, please log in" : null
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

export default ResetPassword