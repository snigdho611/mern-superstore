import axios from 'axios';
import Footer from 'components/Footer'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const VerifyEmail = () => {
    const { token } = useParams();
    const { userId } = useParams();
    const [status, setStatus] = useState(null);

    useEffect(() => {
        axios.post(process.env.REACT_APP_BASE_BACKEND + "/email-verify",
            JSON.stringify({
                token: token,
                userId: userId
            })
            ,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                if (response.data.results.validation) {
                    setStatus(response.data.results.validation);
                }
            })
            .catch((error) => {
                console.log(error)
                setStatus(false)
                // setStatus(error.data.errors.validation)
            })
    }, [token, userId])

    return (
        <>
            <div style={{ textAlign: "center" }}>

                <h1 style={{ fontSize: "20px", fontWeight: "bold", }}>
                    Please wait while your email gets validated
                </h1>
                Email status: {status ? status : "Failed to validate"}
            </div>
            <Footer />
        </>
    )
}

export default VerifyEmail