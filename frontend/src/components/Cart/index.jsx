import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import getUser from 'util/localStorage/getUser';
import classes from './index.module.css'

const Cart = () => {
    const user = getUser();
    const firstName = user && user.userId && user.userId.firstName ? user.userId.firstName : null;
    const lastName = user && user.userId && user.userId.lastName ? user.userId.lastName : null;

    const cart = useSelector((state) => state.cart);
    const [checkout, setCheckout] = useState(false);
    const [displayCheckoutMsg, setDisplayCheckoutMsg] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(cart)
        try {
            axios.post(`${process.env.REACT_APP_BASE_BACKEND
                }/cart/get`,
                {
                    userId: user._id.toString()
                },
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${user.access_token}`
                    }
                }).then((response) => {
                    // if (cart.length === 0) {
                    dispatch({ type: "fill", payLoad: { initialCart: response.data.results } })
                    // }

                }).catch((error) => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }

    }, [dispatch, cart.length])


    const calculateTotal = () => {
        const total = cart.reduce((accumulator, object) => {
            return accumulator + (object.price * object.quantity);
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
        axios.post(`${process.env.REACT_APP_BASE_BACKEND}/cart/remove-product`,
            {
                userId: user._id.toString(),
                productId: data.id
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${user.access_token}`
                }
            }).catch((error) => {
                console.log(error)
            })
        dispatch({
            type: "dec",
            payLoad: { id: data.id }
        })
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
                                <td className={classes.dataCell}>{element.id.slice(-2)}</td>
                                <td className={classes.dataCell}>{element.name}</td>
                                <td className={classes.dataCell}>{element.quantity}</td>
                                <td className={classes.dataCell}>{element.price}x{element.quantity} = {element.price * element.quantity}</td>
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
                    <div className={classes.confirmationMsg}>Thank you for shopping with us, {firstName} {lastName} san, please wait for a confirmation email</div> :
                    <div className={classes.errorMsg}>Sorry, {firstName} {lastName} san, but you need to select something to buy it</div> : null}
        </div>
    )
}

export default Cart