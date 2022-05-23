import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import removeUser from 'util/localStorage/removeUser';
import classes from './index.module.css'

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className={classes.main__container}>
            <div className={classes.main}>
                <Link className={classes.main_a} to="/home" >Home</Link>
                <Link className={classes.main_a} to="/products">Products</Link>
                <Link className={classes.main_a} to="/deals">Deals</Link>
                <Link className={classes.main_a} to="/change">Change Details</Link>
                {/* <Link className={classes.main_a} to="/change">Change Details</Link> */}
                <a href="/#" className={classes.main_a} onClick={() => {
                    removeUser();
                    navigate("/");
                }}>Log Out</a>
            </div>
        </div>
    )
}

export default Navbar