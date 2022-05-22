import React from 'react'
import { useSelector } from 'react-redux';

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    // console.log(cart)

    return (
        <div style={{ width: "60%", margin: "0 300px" }}>
            {/* {cart.state.map((element) => { <div>{element}</div> })} */}
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(element => {
                        return (
                            <tr>
                                <td>{element.id}</td>
                                <td>{element.item}</td>
                                <td>{element.count}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default Cart