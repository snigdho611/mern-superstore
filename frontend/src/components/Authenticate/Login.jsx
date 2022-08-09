import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getUser from 'util/local/getUser';
import classes from './index.module.css';
import { useForm } from "react-hook-form";
import { setUser } from 'util/local';
import Loader from 'components/Loader';
import Input from 'components/Form/Input';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({ success: false, loading: false, message: null })
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
        setResponse({ ...response, loading: true, message: null })
        // console.log({
        //     email: formData.email,
        //     password: formData.password
        // })
        fetch(`${process.env.REACT_APP_BASE_BACKEND}/auth/login`,
            {
                method: "POST",
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                if (response.success) {
                    setUser(JSON.stringify(response.results))
                    setResponse({ ...response, loading: false })
                    saveAndRedirect()
                } else {
                    setResponse({ ...response, loading: false, message: "Username or password doesn't match" })
                }
            })
            .catch((err) => {
                console.log(err)
                setResponse({ ...response, success: false, message: "An unexpected error occured", loading: false })
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
                        <Input
                            label="Email"
                            name="email"
                            register={register}
                            errors={errors}
                            required={true}
                        />
                        <Input
                            label="password"
                            name="password"
                            type="password"
                            register={register}
                            errors={errors}
                            required={true}
                        />
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {!response.loading ?
                                <button className={classes.Form__bottom__loginBtn} onClick={() => {
                                    clearErrors()
                                }}
                                >Log In</button> : <Loader />}
                            <label className={classes.Form__error}>
                                <p>
                                    {
                                        errors.email || errors.password ?
                                            "One of the fields is empty"
                                            : null
                                    }
                                </p>
                                <p>
                                    {response.message}
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
            </div >
        </div >
    )
}

export default Login