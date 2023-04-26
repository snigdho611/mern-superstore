import Accordion from "components/Molecules/Accordion";
import React from "react";

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
        id: 1,
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
    <div>
      <Accordion data={productsList} />
    </div>
  );
};

export default Sidebar;
