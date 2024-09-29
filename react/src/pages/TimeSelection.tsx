import React, {useEffect, useState} from "react";
import "../styles/TimeSelection.css";
import { useLocation, useNavigate } from "react-router-dom";
import {fetchUserData} from "../utils/tokenUtils.ts";

const TimeSelection: React.FC = () => {
    const [selectedTime, setSelectedTime] = useState("08:00");
    const location = useLocation();
    const navigate = useNavigate();

    // Отримання значень з location.state
    const { fromAddress, toAddress, selectedRoute, date } = location.state || {};

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData(navigate);

        };
        fetchData();
    }, []);

    const generateTimeList = () => {
        const times = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 10) {
                const formattedHour = hour.toString().padStart(2, "0");
                const formattedMinute = minute.toString().padStart(2, "0");
                times.push(`${formattedHour}:${formattedMinute}`);
            }
        }
        return times;
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTime(e.target.value);
    };

    const handleSubmitTime = () => {
        navigate("/countPassengerSelection", {
            state: {
                fromAddress,
                toAddress,
                selectedRoute,
                date,
                selectedTime,
            },
        });
    };

    return (
        <div className="time-selection-container">
            <h2>When can you meet the passengers?</h2>
            <div className="time-picker">
                <select value={selectedTime} onChange={handleTimeChange} className="time-dropdown">
                    {generateTimeList().map((time) => (
                        <option key={time} value={time}>
                            {time}
                        </option>
                    ))}
                </select>
            </div>
            <button className="continue-button" onClick={handleSubmitTime}>Continue</button>
        </div>
    );
};

export default TimeSelection;
