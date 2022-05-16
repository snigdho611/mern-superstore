import React from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './index.module.css'

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className={classes.main}>
            <div className={classes.main_child}>
                <div className={classes.navlink} onClick={() => { navigate("/home") }}>
                    Home
                </div>
                <div className={classes.navlink} onClick={() => { navigate("/products") }}>
                    Products
                </div>
                <div className={classes.navlink} onClick={() => { navigate("/sellers") }}>
                    Best Sellers
                </div>
                <div className={classes.navlink} onClick={() => { navigate("/deals") }}>
                    Deals
                </div>
            </div>
        </div>
    )
}

export default Navbar