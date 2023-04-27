import React, { ReactNode } from "react";

interface IButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: string;
}

export enum ButtonType {
  DEFAULT = "default",
}

const Button: React.FC<IButtonProps> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

Button.defaultProps = {
  type: ButtonType.DEFAULT,
};

export default Button;
