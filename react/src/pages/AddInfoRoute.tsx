import React, { useState } from 'react';
import '../styles/AddInfoRoute.css';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const AddInfoRoute: React.FC = () => {
    const location = useLocation();
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [details, setDetails] = useState('');
    const API_URL = import.meta.env.VITE_BASE_URL_API || "KeyNOTfound";
    const [verificationData, setVerificationData] = useState(null);
    const { fromAddress, toAddress, selectedRoute, date, selectedTime, passengers, options, selectBooking, price} = location.state || {};
    const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDetails(e.target.value);
    };

    function saveTrip() {
        /*const bookingData = {
            fromAddress,
            toAddress,
            selectedRoute,
            date,
            selectedTime,
            passengers,
            options,
            selectBooking,
            price,
            userId
        };*/
        //const bookingResponse = await axios.post(`${API_URL}/api/trip/save`, bookingData);

    }

    const handleSubmit =  async () => {
        saveTrip();
        try {
            const response = await axios.get(`${API_URL}/api/user/verification/${userId}`);
            console.log("User verification data:", response.data);
            setVerificationData(response.data);
            const { emailVerified, phoneVerified, documentVerified } = response.data;

            if (!emailVerified || !phoneVerified || !documentVerified) {
                navigate('/userVerification', {state:{emailVerified, phoneVerified, documentVerified}});
            } else {
                navigate('/');
            }
        } catch (err) {
            console.error("Error fetching user verification data:", err);
        }
        console.log("Trip details submitted:", details);

    };

    return (
        <div className="trip-details">
            <h2>Do you want to add anything about the trip?</h2>
            <textarea
                placeholder="Tell passengers if you have space for additional luggage, fuel type, or other trip details"
                value={details}
                onChange={handleDetailsChange}
            />
            <button className="submit-button" onClick={handleSubmit}>
                Publish the trip
            </button>
        </div>
    );
};

export default AddInfoRoute;
