import Footer from "components/Footer";
import Header from "components/Header";
import React, { useState } from "react";
import { Response } from "types";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Form, InputRow, InputSubmit } from "components/Form";
import { useDispatch } from "react-redux";
import { setUser } from "store/user";

const Login = () => {
  const dispatch = useDispatch();
  const [response, setResponse] = useState<Response>({
    success: false,
    loading: false,
    message: null,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmission = (formData: FieldValues) => {
    setResponse({ ...response, loading: true, message: null });
    fetch(`${process.env.REACT_APP_BASE_BACKEND}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setResponse({ ...response, loading: false });
          dispatch(setUser(JSON.stringify(response.results)));
          // window.location = "/home"
          navigate(0);
        } else {
          setResponse({
            ...response,
            loading: false,
            message: "Username or password doesn't match",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setResponse({
          ...response,
          success: false,
          message: "An unexpected error occured",
          loading: false,
        });
      });
  };

  return (
    <>
      <Header />
      <Form
        title="Please Log In to Continue"
        onSubmission={onSubmission}
        handleSubmit={handleSubmit}
      >
        <InputRow label="Email" name="email" register={register} errors={errors} required={true} />
        <InputRow
          label="Password"
          name="password"
          type="password"
          register={register}
          errors={errors}
          required={true}
        />
        <InputSubmit
          text="Log In"
          success={response.success}
          loading={response.loading}
          message={response.message}
        />
        <div className="formlinks">
          <Link to="/reset-password-request">
            <div className="formlink">Forgot Password</div>
          </Link>
          <Link to="/register">
            <div className="formlink">Sign Up</div>
          </Link>
        </div>
      </Form>
      <Footer />
    </>
  );
};

export default Login;
