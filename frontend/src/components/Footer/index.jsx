import React from 'react'
import shopLogo from '../../shop.png'
import classes from './index.module.css'

const Footer = () => {
    return (
        <div className={classes.footer}>
            <img src={shopLogo} alt="" className={classes.footer__img} />
        </div>
    )
}

export default Footer