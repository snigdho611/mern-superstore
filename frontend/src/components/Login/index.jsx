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
                    if (response) {
                        setUser(JSON.stringify(response.data.results));
                        return navigate("/home");
                    } else {
                        setTimeout(() => {
                            setLoading(false);
                            setErrorMsg("Invalid email or password")
                        }, 3000)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            setErrorMsg("Username or password does not match");
        }
    }

    return (
        <div className={classes.main}>
            <h3 style={{ textAlign: "center" }}>Please log in to continue</h3>
            <div className={classes.flex_center}>
                <div>
                    <div className={classes.flex__row}>
                        <div className={classes.flex__row__labelCell}>
                            <label>Username:</label>
                        </div>
                        <div className={classes.flex__row__inputCell}>
                            <input
                                className={classes.inputBox}
                                type="text"
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                value={email}
                            />
                        </div>
                    </div>
                    <div className={classes.flex__row}>
                        <div className={classes.flex__row__labelCell}>
                            <label>Password:</label>
                        </div>
                        <div className={classes.flex__row__inputCell}>
                            <input
                                className={classes.inputBox}
                                type="password"
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                value={password} />
                        </div>
                    </div>
                    <div className={classes.main__bottom}>
                        <div style={{ margin: "0 auto" }}>
                            {!loading ? <button className={classes.loginBtn} onClick={(e) => {
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