import Button, { ButtonType } from "components/Atoms/Button";
import React, { useState } from "react";
import "./index.scss";
import { useSearchParams } from "react-router-dom";

interface IAccordion {
  data: Array<{ id: number; category: string; list: Array<{ id: number; name: string }> }>;
  type?: string;
}

export enum AccordionType {
  DEFAULT = "default",
  SIDEBAR = "sidebar",
}

const Accordion: React.FC<IAccordion> = ({ data, type }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState<{ id: number | null; state: boolean }>({
    id: null,
    state: false,
  });
  return (
    <div className="accordion">
      {data.map(({ id: categoryId, category, list }) => {
        return (
          <div key={categoryId}>
            <Button
              type={type === AccordionType.SIDEBAR ? ButtonType.NAVACCORDION : ButtonType.ACCORDION}
              onClick={() => {
                if (open.id === categoryId) {
                  setOpen((prevState) => ({ ...prevState, state: !open.state }));
                } else {
                  setOpen({ id: categoryId, state: true });
                }
              }}
            >
              {category}
            </Button>
            <div
              className={"accordion_pane"}
              style={open.id === categoryId && open.state ? { maxHeight: "75px" } : {}}
            >
              {list.map(({ id: itemId, name }) => {
                return (
                  <div
                    className={`accordion_pane_button ${
                      type === AccordionType.SIDEBAR ? "accordion_pane_button-nav" : "null"
                    }`}
                    key={itemId}
                    onClick={() => {
                      type === AccordionType.SIDEBAR
                        ? setSearchParams(`category=${categoryId}&product=${itemId}`)
                        : setSearchParams();
                    }}
                  >
                    {name}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

Accordion.defaultProps = {
  type: AccordionType.DEFAULT,
};

export default Accordion;
