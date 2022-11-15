import React from "react";
// import shopLogo from '../../shop.png'

const Footer: React.FC = () => {
  return (
    <div className="w-full fixed flex justify-end bottom-0 -z-10">
      <img
        src={
          "https://res.cloudinary.com/drnym8nne/image/upload/v1659979478/superstore/basic/supermarket_bwbuit.png"
        }
        alt="Not found"
        className="h-[80px]"
      />
    </div>
  );
};

export default Footer;
