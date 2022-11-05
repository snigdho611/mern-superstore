import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "util/local/index";
// import "./index.css";
import { FieldValues, useForm } from "react-hook-form";
import { setUser } from "util/local";
import { Form, InputRow, InputSubmit, Response } from "components/Form";

const Login: React.FC = () => {
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
    <div className="flex flex-col justify-center text-center">
      <h3 className="text-2xl my-10 font-bold">Please log in to continue</h3>
      {/* <Form onSubmission={onSubmission} handleSubmit={handleSubmit}>
        
        <InputSubmit
          text="Add"
          success={response.success}
          loading={response.loading}
          message={response.message}
        />
      </Form> */}
      <Form onSubmission={onSubmission} handleSubmit={handleSubmit}>
        <InputRow label="Email" name="email" register={register} errors={errors} required={true} />
        <InputRow
          label="Password"
          name="password"
          type="password"
          register={register}
          errors={errors}
          required={true}
        />
        {/* <div className="w-3/4 mx-auto flex items-center h-16 px-4">
          <label className="w-1/4 text-right px-3 text-lg text-slate-200" htmlFor="">
            Email:
          </label>
          <input
            className="w-3/4 py-2 px-4 rounded-md focus:bg-slate-200 hover:bg-slate-200 outline-none"
            type={"text"}
            placeholder="Email"
          />
        </div>
        <div className="w-3/4 mx-auto flex items-center h-16 px-4">
          <label className="w-1/4 text-right px-3 text-lg text-slate-200" htmlFor="">
            Password:
          </label>
          <input
            className="w-3/4 py-2 px-4 rounded-md focus:bg-slate-200 hover:bg-slate-200 outline-none"
            type={"password"}
            placeholder="Password"
          />
        </div> */}
        <InputSubmit
          text="Log In"
          success={response.success}
          loading={response.loading}
          message={response.message}
        />
        <div className="my-4 flex flex-col gap-2 w-fit mx-auto">
          <Link to="/reset-password-request">
            <div
              // href="/reset-password-request"
              className="text-xl text-blue-900 hover:text-slate-300 w-fit mx-auto transition-colors"
            >
              Forgot Password
            </div>
          </Link>
          <Link to="/register">
            <div
              // href="/"
              className="text-xl text-blue-900 hover:text-slate-300 w-fit mx-auto transition-colors"
            >
              Sign Up
            </div>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
