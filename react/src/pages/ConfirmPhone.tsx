import React, {useEffect, useState} from 'react';
import 'react-phone-input-2/lib/style.css';
import '../styles/ConfirmPhone.css';
import PhoneInput from 'react-phone-input-2';
import { useNavigate } from 'react-router-dom';
import {fetchUserData} from "../utils/tokenUtils.ts";

const ConfirmPhone: React.FC = () => {
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState<string | undefined>(''); // Додаємо змінну для збереження коду країни
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData(navigate);
        };
        fetchData();
    }, [navigate]);

    const handlePhoneChange = (value: string, country: any) => {
        setPhone(value);
        setCountryCode(country.dialCode);
    };

    const handleContinue = () => {
        console.log("Phone number submitted:", phone);
        console.log("Country code:", countryCode);
        navigate('/verifyPhonesCode', { state: { phone, countryCode } });
    };

    return (
        <div className="phone-number-wrapper">
            <div className="phone-number-container">
                <h1>Write your phone number</h1>
                <p>We will send you a code to continue</p>

                <div className="input-container">
                    <PhoneInput
                        country={'ua'}
                        value={phone}
                        onChange={handlePhoneChange}  // Оновлений обробник змін телефону
                        inputStyle={{
                            width: '100%',
                            height: '50px',
                            borderRadius: '8px',
                            border: '1px solid #E4E7EC',
                            paddingLeft: '60px',  // Для іконки прапора країни
                            fontSize: '16px',
                            color: '#7D7D7D',
                        }}
                        buttonStyle={{
                            borderRadius: '8px 0 0 8px', // Скруглені кути зліва
                            border: '1px solid #E4E7EC',
                        }}
                        containerStyle={{
                            width: '100%',
                        }}
                        dropdownStyle={{
                            borderRadius: '8px',
                        }}
                    />
                </div>

                <div className="button-group">
                    <button className="back-button" onClick={() => navigate(-1)}>
                        Go back
                    </button>
                    <button className="resend-button" onClick={handleContinue}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPhone;
