import React, { useState } from "react";
import '../styles/Options.css';

interface OptionsProps {
    onSortChange: (sortOption: string) => void; // Пропс для передачі функції
    onFiltersChange: (filters: { departureTimes: string[], conveniences: string[] }) => void; // Пропс для передачі фільтрів
}

const Options: React.FC<OptionsProps> = ({ onSortChange, onFiltersChange }) => {
    const [selectedDepartureTimes, setSelectedDepartureTimes] = useState<string[]>([]);
    const [selectedConveniences, setSelectedConveniences] = useState<string[]>([]);

    const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSortChange(event.target.value);
    };

    const handleDepartureTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedDepartureTimes(prev => {
            if (prev.includes(value)) {
                return prev.filter(time => time !== value);
            } else {
                return [...prev, value];
            }
        });
    };

    const handleConvenienceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedConveniences(prev => {
            if (prev.includes(value)) {
                return prev.filter(conv => conv !== value);
            } else {
                return [...prev, value];
            }
        });
    };


    React.useEffect(() => {
        onFiltersChange({ departureTimes: selectedDepartureTimes, conveniences: selectedConveniences });
    }, [selectedDepartureTimes, selectedConveniences]); // eslint-disable-line

    return (
        <div className="container10">
            <h4>Sort by</h4>
            <div className="optionGroup">
                <label>
                    <input type="radio" name="sort" value="earliest" onChange={handleSortChange} />
                    Earliest departure time
                </label>
                <label>
                    <input type="radio" name="sort" value="lowestPrice" onChange={handleSortChange} />
                    Lowest price
                </label>
                <label>
                    <input type="radio" name="sort" value="closeToDestination" onChange={handleSortChange} />
                    Close to destination
                </label>
                <label>
                    <input type="radio" name="sort" value="closeToDeparture" onChange={handleSortChange} />
                    Close to departure point
                </label>
                <label>
                    <input type="radio" name="sort" value="shortestTrip" onChange={handleSortChange} />
                    Shortest trip
                </label>
            </div>
            <h4>Departure time</h4>
            <div className="optionGroup">
                <label>
                    <input type="checkbox" value="06:00 - 12:00" onChange={handleDepartureTimeChange} />
                    06:00 - 12:00
                </label>
                <label>
                    <input type="checkbox" value="12:01 - 18:00" onChange={handleDepartureTimeChange} />
                    12:01 - 18:00
                </label>
                <label>
                    <input type="checkbox" value="After 18:00" onChange={handleDepartureTimeChange} />
                    After 18:00
                </label>
            </div>
            <h4>Conveniences</h4>
            <div className="optionGroup">
                <label>
                    <input type="checkbox" value="Wi-fi" onChange={handleConvenienceChange} />
                    Wi-fi
                </label>
                <label>
                    <input type="checkbox" value="Electronic tickets" onChange={handleConvenienceChange} />
                    Electronic tickets
                </label>
                <label>
                    <input type="checkbox" value="Air conditioning" onChange={handleConvenienceChange} />
                    Air conditioning
                </label>
            </div>
        </div>
    );
};

export default Options;
