import React, { useState } from "react";
import "../styles/CountPassengerSelection.css";
import {useLocation, useNavigate} from "react-router-dom";

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

    const handleSubmit = () => {
        console.log({ passengers, options });
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
        <div className="passenger-selection-container">
            <h2>How many passengers can you take?</h2>
            <div className="passenger-counter">
                <button onClick={() => handlePassengerChange(-1)}>-</button>
                <span>{passengers}</span>
                <button onClick={() => handlePassengerChange(1)}>+</button>
            </div>

            <hr className="divider" />

            <div className="passenger-options">
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
                    <p>Ensure comfort, leave the middle seat empty</p>
                </div>

                <div>
                    <input
                        type="checkbox"
                        id="womenOnly"
                        checked={options.womenOnly}
                        onChange={() => handleOptionChange("womenOnly")}
                    />
                    <label htmlFor="womenOnly">Women only</label>
                    <p>Make your ride visible only to women</p>
                </div>
            </div>

            <button className="continue-button" onClick={handleSubmit}>
                Continue
            </button>
        </div>
    );
};

export default PassengerSelection;
