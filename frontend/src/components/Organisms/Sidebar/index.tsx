import Accordion, { AccordionType } from "components/Molecules/Accordion";
import React from "react";
import "./index.scss";

const productsList = [
  {
    id: 1,
    category: "sound & audio",
    list: [
      {
        id: 1,
        name: "headphone",
      },
      {
        id: 2,
        name: "earbud",
      },
    ],
  },
  {
    id: 2,
    category: "laptops",
    list: [
      {
        id: 1,
        name: "laptop macbook",
      },
      {
        id: 2,
        name: "laptop lenovo",
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Accordion type={AccordionType.SIDEBAR} data={productsList} />
      <Accordion data={productsList} />
    </div>
  );
};

export default Sidebar;
