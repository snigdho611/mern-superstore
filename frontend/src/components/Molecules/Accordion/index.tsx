import React, { useState } from "react";

interface IAccordion {
  data: Array<{ id: number; category: string; list: Array<{ id: number; name: string }> }>;
}

const Accordion: React.FC<IAccordion> = ({ data }) => {
  const [open, setOpen] = useState<{ id: number | null; state: boolean }>({
    id: null,
    state: false,
  });
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {data.map(({ id, category, list }) => {
        return (
          <>
            <button
              key={id}
              onClick={() => {
                setOpen({ id: id, state: !open.state });
              }}
            >
              {category}
            </button>
            {open.id === id && open.state ? (
              <div>
                {list.map(({ id, name }) => {
                  return <div key={id}>{name}</div>;
                })}
              </div>
            ) : null}
          </>
        );
      })}
    </div>
  );
};

export default Accordion;
