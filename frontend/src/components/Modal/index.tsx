import React from "react";
import "./index.scss";

interface ModalProps {
  message: string;
  buttons: {
    text: string;
    function: () => void;
  }[];
}

const Modal: React.FC<ModalProps> = ({ message, buttons }) => {
  return (
    <div className="modal">
      <div className="modal__body">
        <div className="modal__body__message">{message ? message : null}</div>
        <div className="modal__body__buttons">
          {buttons.map((element, i) => {
            return (
              <button
                className="modal__body__buttons__button"
                key={i}
                onClick={() => element.function()}
              >
                {element.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Modal;
