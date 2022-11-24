import React from "react";

interface ModalProps {
  message: string;
  buttons: {
    text: string;
    function: () => void;
  }[];
}

const Modal: React.FC<ModalProps> = ({ message, buttons }) => {
  return (
    <div className="h-[100vh] w-full bg-[rgba(0,0,32,0.3)]  fixed top-0 left-0 z-50 flex justify-center items-center">
      <div className="h-[30%] w-[50%] bg-blue-800 shadow-lg shadow-slate-700 rounded-xl">
        <div className="h-1/2 flex flex-row justify-center items-center text-blue-100">
          {message ? message : null}
        </div>
        <div className="h-1/2 flex flex-row justify-center gap-10">
          {buttons.map((element, i) => {
            return (
              <button
                className="bg-blue-500 h-fit px-5 py-2 rounded-lg"
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
