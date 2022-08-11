// import axios from 'axios';
import Footer from "components/Footer";
import React from "react";
import { useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  //   eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status");

  const generateMessage = (status_: string) => {
    if (status_ === "4") {
      return "Successfully validated";
    }
    if (status_ === "1") {
      return "Failed: user not found, please try again";
    }
    if (status_ === "2") {
      return "Failed: Mail has already been verified";
    }
    if (status_ === "3") {
      return "Failed: Token expired";
    }
    if (status_ === "5") {
      return "Failed: Unknown error occurred";
    }
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Please wait while your email gets validated</h1>
        <p>Email status: {generateMessage(status as string)}</p>
      </div>
      <Footer />
    </>
  );
};

export default VerifyEmail;
