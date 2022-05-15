import React from 'react'
import classes from './index.module.css'

const Navbar = () => {
    return (
        <div className={classes.main}>
            <div className={classes.main_child}>
                <div className={classes.navlink}>
                    Home
                </div>
                <div className={classes.navlink}>
                    Products
                </div>
                <div className={classes.navlink}>
                    Best Sellers
                </div>
                <div className={classes.navlink}>
                    Deals
                </div>
            </div>
        </div>
    )
}

export default Navbar