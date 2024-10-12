import React, {useEffect, useState} from "react";
import "../styles/CountPassengerSelection.css";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchUserData} from "../utils/tokenUtils.ts";
import NavbarComponent from "../components/NavbarComponent.tsx";

const PassengerSelection: React.FC = () => {
    const [passengers, setPassengers] = useState(3);
    const [options, setOptions] = useState({
        maxTwoPassengers: true,
        womenOnly: false,
    });
    const location = useLocation();
    const navigate = useNavigate();

    const { fromAddress, toAddress, selectedRoute, date, selectedTime} = location.state || {};
    const handlePassengerChange = (change: number) => {
        setPassengers(prev => Math.max(1, prev + change));
    };

    const handleOptionChange = (option: string) => {
        setOptions(prev => ({
            ...prev,
            [option]: !prev[option],
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData(navigate);

        };
        fetchData();
    }, []);

    const handleSubmit = () => {
        console.log({ passengers, options, date });
        navigate("/modeBookingSelection", {
            state: {
                fromAddress,
                toAddress,
                selectedRoute,
                date,
                selectedTime,
                passengers,
                options
            },
        });
    };

    return (
        <main className="main">
                <NavbarComponent/>
                <main className="main3">
                    <div className="passenger-selection-container">
                        <h2>How many passengers can you take?</h2>
                        <div className="passenger-counter">
                            <button onClick={() => handlePassengerChange(-1)}>-</button>
                            <span>{passengers}</span>
                            <button onClick={() => handlePassengerChange(1)}>+</button>
                        </div>

                        <hr className="divider"/>

                        <div className="passenger-options">
                            <div className="divOpt">
                                <div>
                                    <input
                                        type="checkbox"
                                        id="maxTwoPassengers"
                                        checked={options.maxTwoPassengers}
                                        onChange={() => handleOptionChange("maxTwoPassengers")}
                                    />
                                    <label htmlFor="maxTwoPassengers">
                                        Maximum of two people in the back seat

                                    </label>
                                </div>
                                <span className="G"></span>


                            </div>

                            <div className="divOpt">
                                <div>
                                    <input
                                        type="checkbox"
                                        id="womenOnly"
                                        checked={options.womenOnly}
                                        onChange={() => handleOptionChange("womenOnly")}
                                    />
                                    <label htmlFor="womenOnly">Women only</label>
                                </div>
                                <span className="W"></span>
                            </div>
                        </div>

                        <button className="continue-button9" onClick={handleSubmit}>
                            Continue
                        </button>
                    </div>
                </main>
            </main>
            );
            };

            export default PassengerSelection;
