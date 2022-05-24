import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getUser from 'util/localStorage/getUser';
import setUser from 'util/localStorage/setUser';
import classes from './index.module.css';

const Login = () => {
    const [username, setUsername] = useState("");
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
        if (username === "") {
            setErrorMsg("Please enter a username");
            return;
        }
        if (password === "") {
            setErrorMsg("Please enter a password");
            return;
        }
        if (username !== "" && password !== "") {
            setLoading(true)

            fetch(process.env.REACT_APP_AUTHENTICATE, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then((response) => {
                return response.json()
            }).then((response) => {
                if (response.length > 0) {
                    setUser(JSON.stringify(response));
                    return navigate("/home");
                } else {
                    setTimeout(() => {
                        setLoading(false);
                        setErrorMsg("Invalid username or password")
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
                                    setUsername(e.target.value)
                                }}
                                value={username}
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