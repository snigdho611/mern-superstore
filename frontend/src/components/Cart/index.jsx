import React from 'react'
import { useSelector } from 'react-redux';
import classes from './index.module.css'

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    // console.log(cart)
    // useEffect(() => {

    // }, [cart])

    const calculateTotal = () => {
        const total = cart.reduce((accumulator, object) => {
            return accumulator + (object.price * object.count);
        }, 0)
        return total
    }

    return (
        <div style={{ width: "60%", margin: "0 300px" }}>
            {/* {cart.state.map((element) => { <div>{element}</div> })} */}
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
                            <tr>
                                <td className={classes.dataCell}>{element.id}</td>
                                <td className={classes.dataCell}>{element.name}</td>
                                <td className={classes.dataCell}>{element.count}</td>
                                <td className={classes.dataCell}>{element.price}x{element.count} = {element.price * element.count}</td>
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
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><button onClick={() => {
                            console.log(cart)
                        }} style={{ width: "100%", height: "40px", border: "1px solid limegreen", cursor: "pointer" }}>Checkout</button></td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default Cart