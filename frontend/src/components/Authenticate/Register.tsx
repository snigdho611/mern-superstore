import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, setUser } from "util/local/index";
// import setUser from "util/local/setUser";
import "./index.css";
import { FieldValues, useForm } from "react-hook-form";
import { Form, InputRow, InputSubmit, Response } from "components/Form";

const Login = () => {
  const [response, setResponse] = useState<Response>({
    success: false,
    loading: false,
    message: null,
  });
  const user = getUser();

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [navigate, user]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmission = (formData: FieldValues) => {
    console.log(formData);
    if (formData.password !== formData.confirmPassword) {
      setError("confirmPassword", { type: "custom", message: "Passwords do not match" });
      return;
    }
    setResponse({ ...response, loading: true });

    fetch(`${process.env.REACT_APP_BASE_BACKEND}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          setResponse({
            ...response,
            loading: false,
            success: true,
            message: "Successfully registered, please log in",
          });
          setUser(JSON.stringify(res.results));
        } else {
          setResponse({
            ...response,
            loading: false,
            success: false,
            message: "Unable to register at this time",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setResponse({
          ...response,
          loading: false,
          success: false,
          message: "Unable to connect to server",
        });
      });
  };

  return (
    <div className="Form">
      <h3 className="Form__header3">Please sign up to continue</h3>
      <Form onSubmission={onSubmission} handleSubmit={handleSubmit}>
        <InputRow
          label="First name"
          name="firstName"
          register={register}
          errors={errors}
          required={true}
          pattern={/^[A-Z a-z]+$/i}
        />
        <InputRow
          label="Last name"
          name="lastName"
          register={register}
          errors={errors}
          required={true}
          pattern={/^[A-Z a-z]+$/i}
        />
        <InputRow
          label="Phone"
          name="phone"
          register={register}
          errors={errors}
          required={true}
          pattern={/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/}
        />
        <InputRow
          label="Email"
          name="email"
          register={register}
          errors={errors}
          required={true}
          pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
        />
        <InputRow
          label="Password"
          name="password"
          register={register}
          errors={errors}
          required={true}
          pattern={/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/}
        />
        <InputRow
          label="Confirm"
          name="confirmPassword"
          register={register}
          errors={errors}
          required={true}
          pattern={/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/}
        />
        <InputSubmit
          text="Confirm"
          success={response.success}
          loading={response.loading}
          message={response.message}
        />
      </Form>
    </div>
  );
};

export default Login;
