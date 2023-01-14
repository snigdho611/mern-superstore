import React from "react";
// import "components/Form/index.css";
import Loader from "components/Loader";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";
import "./index.scss";

export interface Response {
  success: boolean;
  loading: boolean;
  message: string | null;
}

interface FormProps {
  children: React.ReactNode;
  title?: string;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmission: (formData: FieldValues) => void;
}

const Form: React.FC<FormProps> = ({ children, title, handleSubmit, onSubmission }) => {
  return (
    <div className="customform">
      {title ? <h3 className="customform__title">{title}</h3> : null}
      <form onSubmit={handleSubmit(onSubmission)} className="customform__body">
        {children}
      </form>
    </div>
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
    <div className="forminputrow">
      <div className="forminputrow__label">
        <label htmlFor={label}>{label}:</label>
      </div>
      <div className="forminputrow__input">
        <input
          className="forminputrow__input__tag"
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
        <div className="forminputrow__input__error">
          {errors[name] ? errors[name].message : null}
        </div>
      </div>
    </div>
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
        <button className="w-32 text-center rounded-lg bg-blue-800 hover:bg-blue-200 text-blue-200 hover:text-blue-800 transition-colors cursor-pointer px-5 py-2 font-mono font-bold text-lg mx-auto">
          {text}
        </button>
      ) : (
        <Loader />
      )}
      <div className={success ? "text-lime-400" : "text-pink-300"}>{message}</div>
    </div>
  );
};

export { InputRow, InputSubmit, Form };
