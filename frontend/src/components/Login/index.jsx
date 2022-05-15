import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './index.module.css'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg("")
        if (username === "") {
            setErrorMsg("Please enter a username");
            return;
        }
        if (password === "") {
            setErrorMsg("Please enter a password");
        }
        if (username === "John" && password === "1234") {
            return navigate("/home");

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
                            <button className={classes.loginBtn} onClick={(e) => handleSubmit(e)}>Log In</button>
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