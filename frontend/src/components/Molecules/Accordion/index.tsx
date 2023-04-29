import Button, { ButtonType } from "components/Atoms/Button";
import React, { useState } from "react";
import "./index.scss";

interface IAccordion {
  data: Array<{ id: number; category: string; list: Array<{ id: number; name: string }> }>;
}

const Accordion: React.FC<IAccordion> = ({ data }) => {
  const [open, setOpen] = useState<{ id: number | null; state: boolean }>({
    id: null,
    state: false,
  });
  console.log(open);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {data.map(({ id, category, list }) => {
        return (
          <div key={id}>
            <Button
              type={ButtonType.ACCORDION}
              onClick={() => {
                if (open.id === id) {
                  setOpen((prevState) => ({ ...prevState, state: !open.state }));
                } else {
                  setOpen({ id: id, state: true });
                }
              }}
            >
              {category}
            </Button>
            {/* {open.id === id && open.state ? ( */}
            <div
              className={
                open.id === id && open.state
                  ? "accordion_pane accordion_pane-open"
                  : "accordion_pane"
              }
            >
              {list.map(({ id, name }) => {
                return <div key={id}>{name}</div>;
              })}
            </div>
            {/* ) : null} */}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
