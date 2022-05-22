import React from 'react'
import { Link } from 'react-router-dom'
import classes from './index.module.css'

const Navbar = () => {
    return (
        <div className={classes.main__container}>
            <div className={classes.main}>
                <Link className={classes.main_a} to="/home" >Home</Link>
                <Link className={classes.main_a} to="/products">Products</Link>
                <Link className={classes.main_a} to="/deals">Deals</Link>
                <Link className={classes.main_a} to="/change">Change Password</Link>
            </div>
        </div>
    )
}

export default Navbar