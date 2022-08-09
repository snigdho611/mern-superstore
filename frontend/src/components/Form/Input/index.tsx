import React from "react";
import "components/Form/Input/index.css";

interface InputProps {
  label: string;
  name: string;
  register: any;
  errors: any;
  required: boolean;
  pattern: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  register,
  errors,
  required = false,
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
            type="text"
            style={
              errors[name]
                ? {
                    backgroundColor: "#f0abfc",
                  }
                : null
            }
            placeholder={name}
            {...register(`${name}`, {
              required: {
                value: required ? true : false,
                message: `Please enter ${name}`,
              },
            })}
          />
        </div>
      </div>
      <div className="form__row__errors">{errors[name] ? errors[name].message : null}</div>
    </div>
  );
};

export default Input;
