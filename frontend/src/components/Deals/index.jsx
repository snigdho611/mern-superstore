import React from 'react'
import img_one from '../../deal1.webp'
import img_two from '../../deal2.webp'
import img_three from '../../deal3.webp'
import img_four from '../../deal4.webp'
import classes from './index.module.css'

const Deals = () => {
    return (
        <div className={classes.main}>
            <h1 style={{ textAlign: "center" }}>Here are some of our best deals going on!</h1>
            <div className={classes.main__row}>
                <div className={classes.main__row__cell}>
                    <img src={img_one} alt="" />
                </div>
                <div className={classes.main__row__cell}>
                    <img src={img_two} alt="" />
                </div>
                <div className={classes.main__row__cell}>
                    <img src={img_one} alt="" />
                </div>
                <div className={classes.main__row__cell}>
                    <img src={img_two} alt="" />
                </div>
            </div>
            <div className={classes.main__row}>
                <div className={classes.main__row__cell}>
                    <img src={img_three} alt="" />
                </div>
                <div className={classes.main__row__cell}>
                    <img src={img_four} alt="" />
                </div>
                <div className={classes.main__row__cell}>
                    <img src={img_three} alt="" />
                </div>
                <div className={classes.main__row__cell}>
                    <img src={img_four} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Deals