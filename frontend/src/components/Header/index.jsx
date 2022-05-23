import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import getUser from 'util/localStorage/getUser';
import classes from './index.module.css'

const Header = () => {
    const user = getUser();
    const navigate = useNavigate();
    // console.log(user)
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [navigate, user])

    return (
        <div className={classes.main}>
            <div className={classes.image_container}>
                <img className={classes.image} src="/logo192.png" alt="" />

            </div>
            <div className={classes.cart_container}>
                {user ? <Link to="/cart" className={classes.cart_btn}></Link> : null}</div>
        </div>
    )
}

export default Header