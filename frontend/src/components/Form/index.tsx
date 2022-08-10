import React from "react";
import "components/Form/index.css";
import Loader from "components/Loader";

export interface Response {
  success: boolean;
  loading: boolean;
  message: string | null;
}

interface FormProps {
  children: React.ReactNode;
  handleSubmit: any;
  onSubmission: any;
}

const Form: React.FC<FormProps> = ({ children, handleSubmit, onSubmission }) => {
  return (
    <div className="form__container">
      <form onSubmit={handleSubmit(onSubmission)}>{children}</form>
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
  pattern?: string;
}

const InputRow: React.FC<InputRowProps> = ({
  label,
  name,
  register,
  errors,
  required = false,
  type = "text",
  pattern = "",
}) => {
  console.log(errors);
  return (
    <div className="form__row">
      <div className="form__row__main">
        <div className="form__row__labelCell">{label}:</div>
        <div className="form__row__inputCell">
          <input
            className="form__row__inputCell__inputBox"
            type={type}
            style={
              errors[name]
                ? {
                    backgroundColor: "#f0abfc",
                  }
                : null
            }
            // placeholder={name}
            {...register(`${name}`, {
              required: {
                value: required ? true : false,
                message: `Please enter ${name}`,
              },
              pattern: {
                value: pattern !== "" ? pattern : null,
                message: `Pattern of ${name} does not match`,
              },
            })}
          />
        </div>
      </div>
      <div className="form__row__errors">{errors[name] ? errors[name].message : null}</div>
    </div>
  );
};

interface InputSubmitProps {
  loading: boolean;
  message: string | null;
}

const InputSubmit: React.FC<InputSubmitProps> = ({ loading, message }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {!loading ? <button className="form__bottom__btn">Log In</button> : <Loader />}
      <div>{message}</div>
    </div>
  );
};

export { InputRow, InputSubmit, Form };
