import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import getUser from 'util/localStorage/getUser';
import classes from './index.module.css'
import shopLogo from '../../shop.png'

const Header = () => {
    const user = JSON.parse(getUser());
    const user_type = user && user.type ? user.type : null;

    const navigate = useNavigate();
    useEffect(() => {
        // if (!user) {
        //     navigate('/');
        // }
    }, [navigate, user])

    return (
        <div className={classes.main}>
            <div className={classes.image_container}>
                <Link to={user ? "/home" : "/"}>
                    <img className={classes.image} src={shopLogo} alt="" />
                </Link>

            </div>
            <div className={classes.cart_container}>
                {user ? user_type === "regular" ? <Link to="/cart" className={classes.cart_btn}></Link> :
                    <div >
                        <div>Admin Mode</div>
                        <Link to="/products/add">Add Product</Link>
                    </div> : null}</div>
        </div>
    )
}

export default Header