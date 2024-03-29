import React, { ReactNode } from "react";
import "./index.scss";
interface IButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: string;
  bg?: string;
  height?: string;
}

export enum ButtonType {
  DEFAULT = "default",
  ACCORDION = "accordion",
  NAVACCORDION = "navaccordion",
}

const Button: React.FC<IButtonProps> = ({ children, onClick, type, bg, height }) => {
  return (
    <button
      className={`button-${type}`}
      // style={{ backgroundColor: bg, height: height }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: ButtonType.DEFAULT,
};

export default Button;
