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

            fetch("http://127.0.0.1:8000/api/login", {
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
        <div className={classes.flex_center}>
            <h3 style={{ textAlign: "center" }}>Please log in to continue</h3>
            <div className={classes.flex_center}>
                <div>
                    <div className={classes.flex_row}>
                        <div style={{ width: "150px" }}>
                            <label>Username:</label>
                        </div>
                        <div style={{ width: "210px" }}>
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
                    <div className={classes.flex_row}>
                        <div style={{ width: "150px" }}>
                            <label>Password:</label>
                        </div>
                        <div style={{ width: "210px" }}>
                            <input
                                className={classes.inputBox}
                                type="text"
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                value={password} />
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", margin: "0 auto", width: "100%", justifyContent: "center" }}>
                        <div style={{ margin: "0 auto" }}>
                            {!loading ? <button className={classes.loginBtn} onClick={(e) => {
                                // setLoading(true);
                                handleSubmit(e)
                            }}>Log In</button> : <div className={classes.loader} />}
                        </div>
                        <label style={{
                            textAlign: "center", color: "red", margin: "10px",
                            textShadow: "2px 2px 3px crimson"
                        }}>{errorMsg}</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login