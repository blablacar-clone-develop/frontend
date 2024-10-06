import React, { useEffect, useState } from 'react';
import '../styles/ConfirmEmail.css';
import { fetchUserData } from "../utils/tokenUtils.ts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmEmail: React.FC = () => {
    const [code, setCode] = useState<string[]>(new Array(6).fill("")); // масив для 6 цифр
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_BASE_URL_API || "KeyNOTfound";
    const [user, setUser] = useState<{ email: string } | null>(null);
    const [nameBut, setNameBut] = useState<string | null>("Send code");
    useEffect(() => {

        const fetchData = async () => {
            await fetchUserData(navigate);
        };

        const fetchUser = async () => {
            const response = await axios.get(`${API_URL}/api/user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setUser(response.data);
        };

        // const sendCode = async () => {
        //     setIsResendDisabled(true);
        //     const response = await axios.get(`${API_URL}/api/user/getEmailCode`, {
        //             headers: {
        //             Authorization: `Bearer ${localStorage.getItem("token")}`
        //         }
        //     });
        //     if (response.data === "mistake") {
        //         console.log(":(");
        //     }
        //     setTimeout(() => {
        //         setIsResendDisabled(false);
        //     }, 60000);
        // };
        //
        // sendCode();
        fetchUser();
        fetchData();
    }, [API_URL, navigate]);

    const handleInputChange = (element: HTMLInputElement, index: number) => {
        const value = element.value;

        if (value.length === 1 && /^[0-9]$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (element.nextSibling) {
                (element.nextSibling as HTMLInputElement).focus();
            }
        } else if (value === "") {
            const newCode = [...code];
            newCode[index] = "";
            setCode(newCode);
            (element as HTMLInputElement).focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && code[index] === "" && e.currentTarget.previousSibling) {
            (e.currentTarget.previousSibling as HTMLInputElement).focus();
        }
    };

    const verifyCode = async (completeCode: string) => {
        try {
            const response = await axios.post(`${API_URL}/api/verifyCode`, {  completeCode }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.data === "time") {
                console.log("Time is over!");
            } else if (response.data === "incorrect") {
                console.log("Code isn't correct!");
            } else {
                console.log("Good!");
                navigate("/personSettings");
            }
        } catch (error) {
            console.error("Error verifying the code:", error);
            setErrorMessage("The code is incorrect. Please try again.");
        }
    };

    useEffect(() => {
        if (code.every(digit => digit !== "")) {
            const completeCode = code.join("");
            verifyCode(completeCode);
            console.log("Complete code entered:", completeCode);
        }
    }, [code]);

    const handleGoBack = () => {
        navigate("/personSettings");
    };

    // Функція для повторного надсилання коду
    const resendCode = async () => {
        setNameBut("Resend code");
        setIsResendDisabled(true); // Деактивуємо кнопку
        await axios.get(`${API_URL}/api/user/getEmailCode`, {
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

        setTimeout(() => {
            setIsResendDisabled(false); // Активуємо кнопку через 1 хвилину
        }, 360000); // 60000 мілісекунд = 1 хвилина
    };

    return (
        <div className="confirm-email-container">
            <div className="confirm-email-box">
                <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 4l7.89 5.26a2 2 0 002.22 0L21 12" />
                    </svg>
                </div>
                <h2>Confirm your email address</h2>
                <p>Enter the code we sent you to the address <strong>{user?.email}</strong></p>

                <div className="code-inputs">
                    {code.map((digit, idx) => (
                        <input
                            key={idx}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInputChange(e.target, idx)}
                            onKeyDown={(e) => handleKeyDown(e, idx)}
                        />
                    ))}
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <div className="action-buttons">
                    <button className="back-button" onClick={handleGoBack}>Go back</button>
                    <button
                        className="resend-button"
                        onClick={resendCode}
                        disabled={isResendDisabled}
                    >
                        {nameBut}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmEmail;
