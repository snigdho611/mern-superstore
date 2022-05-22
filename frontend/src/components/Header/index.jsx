import React from 'react'
import { Link } from 'react-router-dom'
import classes from './index.module.css'

const Header = () => {
    return (
        <div className={classes.main}>
            <div className={classes.image_container}>
                <img className={classes.image} src="/logo192.png" alt="" />
            </div>
            <div className={classes.cart_container}><Link to="/cart" className={classes.cart_btn}></Link></div>
        </div>
    )
}

export default Header