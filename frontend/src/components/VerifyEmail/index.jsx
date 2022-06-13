// import axios from 'axios';
import Footer from 'components/Footer'
import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';

const VerifyEmail = () => {
    // const [status, setStatus] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const status = searchParams.get("status")

    // useEffect(() => {
    //     console.log(status)
    // }, [status])

    const generateMessage = (status_) => {
        if (status_ === "4") {
            return "Successfully validated";
        }
        if (status_ === "1") {
            return "Failed: user not found, please try again"
        }
        if (status_ === "2") {
            return "Failed: Mail has already been verified"
        }
        if (status_ === "3") {
            return "Failed: Token expired"
        }
        if (status_ === "5") {
            return "Failed: Unknown error occurred"
        }
    }

    return (
        <>
            <div style={{ textAlign: "center" }}>

                <h1>
                    Please wait while your email gets validated
                </h1>
                <p>
                    Email status: {generateMessage(status)}
                </p>
            </div>
            <Footer />
        </>
    )
}

export default VerifyEmail