import React from 'react'
import { Link } from 'react-router-dom'
import sessionGetUser from 'util/sessionStorage/getUser';
import localGetUser from 'util/localStorage/getUser';
import classes from './index.module.css'

const Home = () => {
    const user = localGetUser();
    // const firstName = user && user.userId && user.userId.firstName ? user.userId.firstName : null;
    // const lastName = user && user.userId && user.userId.lastName ? user.userId.lastName : null;
    return (
        <div className={classes.main}>
            <h2 style={{ fontSize: "24px" }}>Welcome to ABC Store
                {` ${user?.firstName} ${user?.lastName} `}san
            </h2>
            <p>Find our best deals at <Link className={classes.main__link} to='/deals'>here</Link></p>
            <p>Or find products that you want to buy over <Link className={classes.main__link} to='/products'>here</Link></p>
        </div>
    )
}

export default Home