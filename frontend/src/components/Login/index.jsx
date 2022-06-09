import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getUser from 'util/localStorage/getUser';
import setUser from 'util/localStorage/setUser';
import classes from './index.module.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const user = getUser();
    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate])


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg("")
        if (email === "") {
            setErrorMsg("Please enter a email");
            return;
        }
        if (password === "") {
            setErrorMsg("Please enter a password");
            return;
        }
        if (email !== "" && password !== "") {
            setLoading(true)
            axios.post(`${process.env.REACT_APP_BASE_BACKEND}/login`,
                {
                    email: email,
                    password: password
                }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    console.log(response.success)
                    setUser(JSON.stringify(response.data.results));
                    return navigate("/home");

                })
                .catch((err) => {
                    setTimeout(() => {
                        setErrorMsg("Invalid email or password")

                        setLoading(false);
                    }, 2000)
                    console.log(err)
                })
        } else {
            setErrorMsg("Username or password does not match");
        }
    }

    return (
        <div className={classes.main}>
            <h3 style={{ textAlign: "center" }}>Please log in to continue</h3>
            <div className={classes.main__container}>
                <div className={classes.tform}>
                    <div className={classes.tform__row}>
                        <div className={classes.tform__row__labelCell}>
                            Username:
                        </div>
                        <div className={classes.tform__row__inputCell}>
                            <input
                                className={classes.tform__row__inputBox}
                                type="text"
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                value={email}
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
                                type="password"
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                value={password} />
                        </div>
                    </div>
                    <div className={classes.main__bottom}>
                        <div style={{ margin: "0 auto" }}>
                            {!loading ? <button className={classes.main__bottom__loginBtn} onClick={(e) => {
                                handleSubmit(e)
                            }}>Log In</button> : <div className={classes.loader} />}
                        </div>
                        <label className={classes.main__error}>{errorMsg}</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login