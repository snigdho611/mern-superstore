import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getUser from "util/local/getUser";
import "./index.css";
import { FieldValues, useForm } from "react-hook-form";
import { setUser } from "util/local";
import { Form, InputRow, InputSubmit } from "components/Form";

interface Response {
  success: boolean;
  loading: boolean;
  message: string | null;
}

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
    <div className="Form">
      <h3 className="Form__header3">Please log in to continue</h3>
      {/* <div className="Form__container">
        <form onSubmit={handleSubmit(onSubmission)}>
          
        </form>
      </div> */}
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
        <InputSubmit loading={response.loading} message={response.message} />
      </Form>
      <div>
        <Link to="/reset-password-request" className="Form__link">
          Forgot Password
        </Link>
      </div>
      <div>
        <Link to="/register" className="Form__link">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
