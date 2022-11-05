import React from "react";
import "components/Form/index.css";
import Loader from "components/Loader";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";

export interface Response {
  success: boolean;
  loading: boolean;
  message: string | null;
}

interface FormProps {
  children: React.ReactNode;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmission: (formData: FieldValues) => void;
}

const Form: React.FC<FormProps> = ({ children, handleSubmit, onSubmission }) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmission)}
      className="w-1/2 mx-auto bg-blue-500 flex flex-col py-5 rounded-lg"
    >
      {children}
    </form>
  );
};

interface InputRowProps {
  label: string;
  name: string;
  register: any;
  errors: any;
  required: boolean;
  type?: string;
  pattern?: RegExp | null;
}

const InputRow: React.FC<InputRowProps> = ({
  label,
  name,
  register,
  errors,
  required = false,
  type = "text",
  pattern = null,
}) => {
  return (
    <div className="w-3/4 mx-auto flex items-center h-16 px-4">
      <label className="w-1/4 text-right px-3 text-lg text-slate-200" htmlFor={label}>
        {label}:
      </label>
      <input
        className="w-3/4 py-2 px-4 rounded-md focus:bg-slate-200 hover:bg-slate-200 outline-none"
        type={type}
        placeholder={label}
        {...register(`${name}`, {
          required: {
            value: required ? true : false,
            message: `Please enter ${name}`,
          },
          pattern: {
            value: pattern ? pattern : null,
            message: `Pattern of ${name} does not match`,
          },
        })}
      />
    </div>
    // <div className="form__row">
    //   <div className="form__row__main">
    //     <div className="form__row__labelCell">{label}:</div>
    //     <div className="form__row__inputCell">
    //       <input
    //         className="form__row__inputCell__inputBox"
    //         type={type}
    //         style={
    //           errors[name]
    //             ? {
    //                 backgroundColor: "#f0abfc",
    //               }
    //             : null
    //         }
    //         {...register(`${name}`, {
    //           required: {
    //             value: required ? true : false,
    //             message: `Please enter ${name}`,
    //           },
    //           pattern: {
    //             value: pattern ? pattern : null,
    //             message: `Pattern of ${name} does not match`,
    //           },
    //         })}
    //       />
    //     </div>
    //   </div>
    //   <div className="form__row__errors">{errors[name] ? errors[name].message : null}</div>
    // </div>
  );
};

interface InputSubmitProps {
  text: string;
  loading: boolean;
  message: string | null;
  success: boolean;
}

const InputSubmit: React.FC<InputSubmitProps> = ({ text, loading, message, success }) => {
  return (
    <div className="flex flex-col">
      {!loading ? (
        <button className="w-32 text-center rounded-lg bg-blue-800 cursor-pointer px-5 py-2 text-teal-100 font-mono font-bold text-lg mx-auto">
          {text}
        </button>
      ) : (
        <Loader />
      )}
      <div className={success ? "text-lime-400" : "text-red-600"}>{message}</div>
    </div>
  );
};

export { InputRow, InputSubmit, Form };
