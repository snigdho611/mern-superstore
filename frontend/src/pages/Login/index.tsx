import Footer from "components/Footer";
import Header from "components/Header";
import React, { useEffect, useState } from "react";
// import Login from "components/Authenticate/Login";
import { Response } from "types";
import { getUser, setUser } from "util/local";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Form, InputRow, InputSubmit } from "components/Form";

const Login = () => {
  const [response, setResponse] = useState<Response>({
    success: false,
    loading: false,
    message: null,
  });
  const user = getUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [navigate, user]);

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
        console.log(response);
        if (response.success) {
          setUser(JSON.stringify(response.results));
          setResponse({ ...response, loading: false });
          saveAndRedirect();
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

  const saveAndRedirect = () => {
    navigate("/home");
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
