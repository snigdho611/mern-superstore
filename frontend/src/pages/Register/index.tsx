import Footer from "components/Footer";
import { Form, InputRow, InputSubmit } from "components/Form";
import Header from "components/Header";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Response } from "types";
import { getUser, setUser } from "util/local";

const Register = () => {
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
    <>
      <Header />
      <Form
        title="Please sign up to continue"
        onSubmission={onSubmission}
        handleSubmit={handleSubmit}
      >
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
      <Footer />
    </>
  );
};

export default Register;
