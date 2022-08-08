import React from 'react'
import { Link } from 'react-router-dom'
import getUser from 'util/local/getUser';
import classes from './index.module.css'
import shopLogo from '../../shop.png'

const Header = () => {
    let user = getUser();

    return (
        <div className="header">
            <div className={classes.image__container}>
                <Link to={user ? "/home" : "/"}>
                    <img className={classes.image} src={shopLogo} alt="" />
                </Link>
            </div>
            <div className={classes.cart__container}>
                {user ?
                    user.isAdmin ?
                        <div>
                            <div>Admin Mode</div>
                        </div>
                        : <div >
                            <Link to="/cart" className={classes.cart__btn}>Cart</Link>
                        </div>
                    : null}
            </div>
        </div>
    )
}

export default Header