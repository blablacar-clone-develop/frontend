import React, {useEffect} from "react";
import "../styles/ModeBookingSelection.css";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchUserData} from "../utils/tokenUtils.ts";
import PanelLogo from "../components/PanelLogo.tsx";
import NavbarComponent from "../components/NavbarComponent.tsx";

const ModeBookingSelection: React.FC = () => {
    const location = useLocation();

    const navigate = useNavigate();

    const { fromAddress, toAddress, selectedRoute, date, selectedTime, passengers, options} = location.state || {};

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData(navigate);

        };
        fetchData();
    }, []);

    function nextPage(selectBooking: string) {
        navigate("/priceSelection", {
            state: {
                fromAddress,
                toAddress,
                selectedRoute,
                date,
                selectedTime,
                passengers,
                options,
                selectBooking
            },
        });
    }

    function handleEach() {
        const selectBooking = "each"
        nextPage(selectBooking);
    }
    function handleInstant() {
        const selectBooking = "instant"
        nextPage(selectBooking);
    }

    return (
        <main className="main">
                <NavbarComponent/>
                <div className="globalDiv">
                    <div className="instant-booking-container">
                        <div className="content-container">
                            <div className="text-container">
                                <h2>Enable Instant Booking for your passengers</h2>
                                <div className="info">
                                    <div className="info-item">
                                        <div>
                                            <strong>It's more convenient</strong>
                                            <p>No need to review every request before it expires</p>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <div>
                                            <strong>More passengers</strong>
                                            <p>They like getting quick responses</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <button className="primary-button" onClick={handleInstant}>Enable Instant Booking
                                    </button>
                                    <hr className="divider2"/>
                                    <button className="secondary-button" onClick={handleEach}>Review each request
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            );
            };

            export default ModeBookingSelection;
