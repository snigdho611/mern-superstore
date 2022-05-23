import React from 'react'
import { Link } from 'react-router-dom'
import getUser from 'util/localStorage/getUser'
import classes from './index.module.css'

const Home = () => {
    return (
        <div className={classes.main}>
            <h2>Welcome to ABC Store, {JSON.parse(getUser())[0].firstname} san</h2>
            <p>Find our best deals at <Link className={classes.main__link} to='/deals'>here</Link></p>
            <p>Or find products that you want to buy over <Link className={classes.main__link} to='/products'>here</Link></p>
        </div>
    )
}

export default Home