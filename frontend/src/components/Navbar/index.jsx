import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import getUser from 'util/localStorage/getUser';
import removeUser from 'util/localStorage/removeUser';
import classes from './index.module.css'

const Navbar = () => {
    const navigate = useNavigate();
    const user = getUser();

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user, navigate])

    return (
        <div className={classes.Nav}>
            <div className={classes.Nav__container}>
                <Link className={classes.Nav__link} to="/home" >Home</Link>
                <Link className={classes.Nav__link} to="/products">Products</Link>
                {
                    user && user.isAdmin ? <Link className={classes.Nav__link} to="/products/add">Add Product</Link> :
                        <Link className={classes.Nav__link} to="/deals">Deals</Link>
                }
                <a href="/#" className={classes.Nav__link} onClick={() => {
                    removeUser();
                    navigate("/");
                }}>Log Out</a>
            </div>
        </div>
    )
}

export default Navbar