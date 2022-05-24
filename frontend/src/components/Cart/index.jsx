import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import getUser from 'util/localStorage/getUser';
import classes from './index.module.css'

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const [checkout, setCheckout] = useState(false);
    const [displayCheckoutMsg, setDisplayCheckoutMsg] = useState();

    const dispatch = useDispatch();
    const calculateTotal = () => {
        const total = cart.reduce((accumulator, object) => {
            return accumulator + (object.price * object.count);
        }, 0)
        return total
    }

    const proceedCheckout = () => {
        setDisplayCheckoutMsg(true);
        if (calculateTotal() === 0) {
            setCheckout(false);
        } else {
            setCheckout(true);
        }
    }

    const removeFromCart = (data) => {
        dispatch({ type: "dec", payLoad: { id: data.id } })
    }

    return (
        <div className={classes.main}>
            <table style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th className={classes.dataHead} style={{ width: "10%" }}>#</th>
                        <th className={classes.dataHead} style={{ width: "40%" }}>Name</th>
                        <th className={classes.dataHead} style={{ width: "20%" }}>Qty</th>
                        <th className={classes.dataHead} style={{ width: "30%" }}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(element => {
                        return (
                            <tr key={element.id}>
                                <td className={classes.dataCell}>{element.id}</td>
                                <td className={classes.dataCell}>{element.name}</td>
                                <td className={classes.dataCell}>{element.count}</td>
                                <td className={classes.dataCell}>{element.price}x{element.count} = {element.price * element.count}</td>
                                <td ><button className={classes.cart__crossBtn} onClick={() => { removeFromCart(element) }}>x</button></td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className={classes.dataCell}>Total: <label style={{ fontWeight: "bold" }}>{calculateTotal()}</label></td>
                    </tr>
                    <tr>
                        <td><Link className={classes.cart_goback_btn} to="/products">{"<="}</Link></td>
                        <td></td>
                        <td></td>
                        <td><button className={classes.cart_checkout_btn} onClick={() => proceedCheckout()}>Checkout</button></td>
                    </tr>
                </tbody>
            </table>
            {displayCheckoutMsg ?
                checkout ?
                    <div className={classes.confirmationMsg}>Thank you for shopping with us, {JSON.parse(getUser())[0].firstname} san, please wait for a confirmation email</div> :
                    <div className={classes.errorMsg}>Sorry, {JSON.parse(getUser())[0].firstname} san, but you need to select something to buy it</div> : null}
        </div>
    )
}

export default Cart