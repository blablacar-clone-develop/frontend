import React, {useEffect, useState} from 'react';
import '../styles/ConfirmEmail.css';
import {fetchUserData} from "../utils/tokenUtils.ts";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const ConfirmEmail: React.FC = () => {
    const [code, setCode] = useState<string[]>(new Array(6).fill("")); // масив для 6 цифр
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_BASE_URL_API || "KeyNOTfound";
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData(navigate);
        };
        const fetchUser = async ()=>
        {
            const response = await axios.get(`${API_URL}/api/user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setUser(response.data)
        }
        const sendCode = async () =>
        {
            const response = await axios.get(`${API_URL}/api/user/confirmEmail/${localStorage.getItem("userId")}`);
        }

        fetchUser();
        fetchData();
    }, []);

    // Обробка введення цифр
    const handleInputChange = (element: HTMLInputElement, index: number) => {
        const value = element.value;

        if (value.length === 1 && /^[0-9]$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (element.nextSibling) {
                (element.nextSibling as HTMLInputElement).focus(); // Перемикання на наступне поле
            }
        }
    };

    function handleGoBack() {
        navigate("/personSettings");
    }

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
                        />
                    ))}
                </div>

                <div className="action-buttons">
                    <button className="back-button" onClick={handleGoBack}>Go back</button>
                    <button className="resend-button">Resend code</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmEmail;
