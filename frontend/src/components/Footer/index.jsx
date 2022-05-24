import React from 'react'
import shopLogo from '../../shop.png'

const Footer = () => {
    return (
        <div style={{ width: "100%", position: "fixed", display: "flex", justifyContent: "right", bottom: "0", zIndex: "-1" }}>
            <img src={shopLogo} alt="" style={{ height: "80px" }} />
        </div>
    )
}

export default Footer