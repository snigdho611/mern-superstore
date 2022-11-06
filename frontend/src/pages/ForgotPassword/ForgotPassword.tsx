import Footer from "components/Footer";
import { Form, InputRow, InputSubmit } from "components/Form";
import Header from "components/Header";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Response } from "types";
import { getUser } from "util/local/index";
// import classes from './index.module.css'

const ForgotPassword = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [response, setResponse] = useState<Response>({
    success: false,
    loading: false,
    message: null,
  });
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [navigate, user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmission = (formData: FieldValues) => {
    setResponse({ ...response, loading: true, message: null });
    fetch(`${process.env.REACT_APP_BASE_BACKEND}/auth/reset-password-email`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.email,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (response.success) {
          setResponse({ ...response, loading: false });
          //
        } else {
          //
          setResponse({
            ...response,
            loading: false,
            message: "Email does not exist",
          });
        }
      })
      .catch((err) => {
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
      <Form title="Please enter your email" onSubmission={onSubmission} handleSubmit={handleSubmit}>
        <InputRow label="Email" name="email" errors={errors} register={register} required={true} />
        <InputSubmit
          text="Submit"
          success={response.success}
          loading={response.loading}
          message={response.message}
        />
        <div className="my-4 flex flex-col gap-2 w-fit mx-auto">
          <Link to="/">
            <div className="text-xl text-blue-900 hover:text-slate-300 w-fit mx-auto transition-colors">
              Log In
            </div>
          </Link>
        </div>
      </Form>
      <Footer />
    </>
  );
};

export default ForgotPassword;
