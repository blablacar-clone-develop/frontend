import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/AdditionalAmentities.css';
import NavbarComponent from "../components/NavbarComponent.tsx";  // CSS for styling the page

const AdditionalAmentities: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { fromAddress, toAddress, selectedRoute, date, selectedTime, passengers, options, selectBooking, price } = location.state || {};

    // State to store the selected amenities
    const [selectedAmenities, setSelectedAmenities] = useState({
        wifi: false,
        eTickets: false,
        airConditioning: false,
        smoking: false,
        petsAllowed: false,
        food: false
    });

    const handleAmenityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setSelectedAmenities(prev => ({
            ...prev,
            [name]: checked
        }));
    };


    const handleSubmit = () => {
        navigate("/addInfoRoute", {
            state: {
                fromAddress,
                toAddress,
                selectedRoute,
                date,
                selectedTime,
                passengers,
                options,
                selectBooking,
                price,
                amenities: selectedAmenities  // Pass the selected amenities
            },
        });
    };

    return (
        <main className="main">
                <NavbarComponent/>
                <main className="main3">
                    <div className="amenities-selection">
                        <h2>Select amenities for your passengers</h2>
                        <div className="amenities-list">
                            <div>
                                <label>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="wifi"
                                            checked={selectedAmenities.wifi}
                                            onChange={handleAmenityChange}
                                        />
                                        Wi-fi
                                    </div>
                                    <span className="iconAm wifi"></span>
                                </label>
                            </div>
                            <hr className="divider1"/>
                            <div>
                                <label>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="eTickets"
                                            checked={selectedAmenities.eTickets}
                                            onChange={handleAmenityChange}
                                        />
                                        E-tickets
                                    </div>
                                    <span className="iconAm mobile"></span>
                                </label>
                            </div>
                            <hr className="divider1"/>
                            <div>
                                <label>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="airConditioning"
                                            checked={selectedAmenities.airConditioning}
                                            onChange={handleAmenityChange}
                                        />
                                        Air Conditioning
                                    </div>
                                    <span className="iconAm sun"></span>
                                </label>
                            </div>
                            <hr className="divider1"/>
                            <div>
                                <label>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="smoking"
                                            checked={selectedAmenities.smoking}
                                            onChange={handleAmenityChange}
                                        />
                                        Smoking allowed
                                    </div>
                                    <span className="iconAm smoking"></span>
                                </label>
                            </div>
                            <hr className="divider1"/>
                            <div>
                                <label>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="petsAllowed"
                                            checked={selectedAmenities.petsAllowed}
                                            onChange={handleAmenityChange}
                                        />
                                        Pets allowed
                                    </div>
                                    <span className="iconAm paw"></span>
                                </label>
                            </div>
                            <hr className="divider1"/>
                            <div>
                                <label>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="food"
                                            checked={selectedAmenities.food}
                                            onChange={handleAmenityChange}
                                        />
                                        Food provided
                                    </div>
                                    <span className="iconAm food"></span>
                                </label>
                            </div>
                            <hr className="divider1"/>
                        </div>

                        <button className="continue-button11" onClick={handleSubmit}>Next</button>
                    </div>
                </main>
            </main>
            );
            };

            export default AdditionalAmentities;
