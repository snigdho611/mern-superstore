import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import getUser from 'util/localStorage/getUser';
import removeUser from 'util/localStorage/removeUser';
import classes from './index.module.css'

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(getUser());

    useEffect(() => {
        // if (!user) {
        //     return navigate("/");
        // }
    }, [user, navigate])
    return (
        <div className={classes.main}>
            <div className={classes.main__child}>
                <Link className={classes.main_a} to="/home" >Home</Link>
                <Link className={classes.main_a} to="/products">Products</Link>
                <Link className={classes.main_a} to="/deals">Deals</Link>
                <Link className={classes.main_a} to="/change">Change Details</Link>
                <a href="/#" className={classes.main_a} onClick={() => {
                    removeUser();
                    navigate("/");
                }}>Log Out</a>
            </div>
        </div>
    )
}

export default Navbar