import React from "react";
// import shopLogo from '../../shop.png'
import "./index.css";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <img
        src={
          "https://res.cloudinary.com/drnym8nne/image/upload/v1659979478/superstore/basic/supermarket_bwbuit.png"
        }
        alt="Not found"
        className="footer__img"
      />
    </div>
  );
};

export default Footer;
