import React, { useState, useEffect } from 'react';
import '../styles/PriceSelection.css';
import { useLocation, useNavigate } from "react-router-dom";
import {fetchUserData} from "../utils/tokenUtils.ts";

const PriceSelection: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { fromAddress, toAddress, selectedRoute, date, selectedTime, passengers, options, selectBooking } = location.state || {};

    const [price, setPrice] = useState(5);
    const [minPrice, setMinPrice] = useState(5);
    const [maxPrice, setMaxPrice] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData(navigate);

        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedRoute && selectedRoute.distance) {
            let distance = selectedRoute.distance;
            if (typeof distance === 'string') {
                distance = parseFloat(distance.replace(/[^\d.-]/g, ''));
            }
            const basePrice = calculateBasePrice(distance);

            const min = Math.max(5, basePrice * 0.5);
            const max = basePrice * 2; //

            setPrice(basePrice);
            setMinPrice(min);
            setMaxPrice(max);
        }
    }, [selectedRoute]);

    const calculateBasePrice = (distance: number) => {
        const pricePerKm = 2;
        return Math.round(distance * pricePerKm);
    };

    const decreasePrice = () => {
        if (price > minPrice) {
            setPrice(price - 5);
        }
    };

    const increasePrice = () => {
        if (price < maxPrice) {
            setPrice(price + 5);
        }
    };

    function handleSubmit() {
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
                price
            },
        });
    }

    return (
        <div className="price-selector">
            <h2>Select the price per seat</h2>
            <div className="price-control">
                <button className="decrease" onClick={decreasePrice}>-</button>
                <span className="price">{price} UAH</span>
                <button className="increase" onClick={increasePrice}>+</button>
            </div>
            <div className="price-info">
                <span className="recommended-price">
                    Recommended price: {minPrice*1.5} UAH - {maxPrice/1.5} UAH
                </span>
                <p>Optimal price for this trip! You will find passengers quickly.</p>
            </div>
            <button className="next-button" onClick={handleSubmit}>Next</button>
        </div>
    );
};

export default PriceSelection;
