import React, { useState, useEffect } from 'react';
import '../styles/PriceSelection.css';
import { useLocation, useNavigate } from "react-router-dom";
import {fetchUserData} from "../utils/tokenUtils.ts";
import PanelLogo from "../components/PanelLogo.tsx";

const PriceSelection: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { fromAddress, toAddress, selectedRoute, date, selectedTime, passengers, options, selectBooking } = location.state || {};
    const [green, setGreen] = useState(5);
    const [orange, setOrange] = useState(5);
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

            const min = Math.max(5, basePrice * 0.8);
            const max = basePrice * 1.5;
            setGreen(basePrice *1.1);
            setOrange(basePrice *1.2);
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
        navigate("/additional", {
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

    //
    const getPriceColor = () => {
        if (price > orange) {
            return '#DD0000';
        } else if (price > green) {
            return '#E57300';
        } else if (price <= green) {
            return '#028B1B';
        }
        return 'black';
    };

    return (
        <main className="main">
            <PanelLogo/>
            <main className="main3">
                <div className="price-selector">
                    <h2>Select the price per seat</h2>
                    <div className="price-control">
                        <button className="decrease" onClick={decreasePrice}>-</button>
                        {/* Додаємо стилізацію кольору для ціни */}
                        <span className="price2" style={{ color: getPriceColor() }}>{price} UAH</span>
                        <button className="increase" onClick={increasePrice}>+</button>
                    </div>
                    <div className="price-info">
                        {/* Округляємо мінімальне та максимальне значення */}
                        <span className="recommended-price" style={{ backgroundColor: getPriceColor() }}>
                    Recommended price: {Math.round(minPrice)} UAH - {Math.round(maxPrice)} UAH
                </span>
                        <p>Optimal price for this trip! You will find passengers quickly.</p>
                    </div>
                    <button className="continue-button10" onClick={handleSubmit}>Next</button>
                </div>
            </main>
        </main>
    );
};

export default PriceSelection;
