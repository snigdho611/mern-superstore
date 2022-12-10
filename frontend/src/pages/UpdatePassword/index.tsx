import Footer from "components/Footer";
import { Form, InputRow, InputSubmit } from "components/Form";
import Header from "components/Header";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Response } from "types";

const UpdatePassword = () => {
  const [response, setResponse] = useState<Response>({
    success: false,
    loading: false,
    message: null,
  });
  const { token, userId } = useParams();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmission = (formData: FieldValues) => {
    console.log(formData.password, formData.confirmPassword);
    if (formData.password !== formData.confirmPassword) {
      setError("confirmPassword", { type: "custom", message: "Passwords do not match" });
      return;
    }
    setResponse({ ...response, success: false, loading: true });
    const requestData = {
      token: token,
      userId: userId,
      ...formData,
    };
    console.log(requestData);
    fetch(`${process.env.REACT_APP_BASE_BACKEND}/auth/reset-password`, {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setResponse({
            success: true,
            loading: false,
            message: "Successfully updated password",
          });
        } else {
          setResponse({
            success: false,
            loading: false,
            message: res.message,
          });
        }
      })
      .catch((error) => {
        console.log(error);
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
        onSubmission={onSubmission}
        handleSubmit={handleSubmit}
        title="Please create a new password"
      >
        <InputRow
          label="New Password"
          name="password"
          type="password"
          register={register}
          errors={errors}
          required={true}
        />
        <InputRow
          label="Confirm"
          name="confirmPassword"
          type="password"
          register={register}
          errors={errors}
          required={true}
        />
        <InputSubmit
          text="Reset"
          success={response.success}
          loading={response.loading}
          message={response.message}
        />
      </Form>
      <Footer />
    </>
  );
};

export default UpdatePassword;
