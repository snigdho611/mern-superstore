import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import getUser from 'util/localStorage/getUser';
import classes from './index.module.css'
import shopLogo from '../../shop.png'

const Header = () => {
    const user = getUser();

    return (
        <div className={classes.main}>
            <div className={classes.image__container}>
                <Link to={user ? "/home" : "/"}>
                    <img className={classes.image} src={shopLogo} alt="" />
                </Link>
            </div>
            <div className={classes.cart__container}>
                {user ?
                    !user.isAdmin ?
                        <Link to="/cart" className={classes.cart__btn}>Cart</Link>
                        : <div >
                            <div>Admin Mode</div>
                            <Link to="/products/add">Add Product</Link>
                        </div>
                    : null}
            </div>
        </div>
    )
}

export default Header