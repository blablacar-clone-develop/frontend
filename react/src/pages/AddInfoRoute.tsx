import React, {useEffect, useState} from 'react';
import '../styles/AddInfoRoute.css';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {fetchUserData} from "../utils/tokenUtils.ts";
import PanelLogo from "../components/PanelLogo.tsx";
import NavbarComponent from "../components/NavbarComponent.tsx";

const AddInfoRoute: React.FC = () => {
    const location = useLocation();
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [details, setDetails] = useState('');
    const API_URL = import.meta.env.VITE_BASE_URL_API || "KeyNOTfound";
    const [verificationData, setVerificationData] = useState(null);
    const { fromAddress, toAddress, selectedRoute, date, selectedTime, passengers, options, selectBooking, price, amenities} = location.state || {};

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData(navigate);

        };
        fetchData();
    }, []);


    const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDetails(e.target.value);
    };

    async function saveTrip() {
        const bookingData = {
            fromAddress,
            toAddress,
            selectedRoute,
            date,
            selectedTime,
            passengers,
            options,
            selectBooking,
            price,
            amenities
        };

        const bookingResponse = await axios.post(`${API_URL}/api/trips/create`, bookingData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        console.log(bookingResponse.data);
    }

    const handleSubmit =  async () => {
        console.log(location.state);
        saveTrip();
        try {
            const response = await axios.get(`${API_URL}/api/user/verification/${userId}`);
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
        <main className="main">
                <NavbarComponent/>
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
            </main>
            );
            };

            export default AddInfoRoute;
