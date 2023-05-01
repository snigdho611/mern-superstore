import Accordion, { AccordionType } from "components/Molecules/Accordion";
import { useEffect, useRef, useState } from "react";
import "./index.scss";
import Button from "components/Atoms/Button";
// import { ReactComponent as ArrowIcon } from "images/text";

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
  const [sidebar, setSidebar] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sidebarRef.current) {
      return;
    }
    if (sidebar) {
      sidebarRef.current.style.marginLeft = "-17.5%";
    } else {
      sidebarRef.current.style.marginLeft = "0%";
    }
  }, [sidebar]);

  return (
    <>
      <div className="sidebar" ref={sidebarRef}>
        <div style={{ display: "block", float: "right", zIndex: "5" }}>
          <Button
            // style={{ display: "block", float: "right", zIndex: "5" }}
            // bg="rgb(187, 255, 172)"
            // height="30px"
            onClick={() => setSidebar(!sidebar)}
          >
            <img
              style={sidebar ? { transform: "scaleX(-1)" } : {}}
              src="/images/icons/arrow-sidebar.png"
              alt=""
            />
          </Button>
        </div>
        <Accordion type={AccordionType.SIDEBAR} data={productsList} />
        {/* <Accordion data={productsList} /> */}
      </div>
    </>
  );
};

export default Sidebar;
