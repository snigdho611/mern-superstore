import React from 'react'
import { Link } from 'react-router-dom'
import classes from './index.module.css'

const Navbar = () => {
    return (
        <div className={classes.main__container}>
            <div className={classes.main}>
                <Link to="/" >Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/deals">Deals</Link>
                <Link to="/change">Change Password</Link>
            </div>
        </div>
    )
}

export default Navbar