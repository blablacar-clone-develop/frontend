import React from "react";
import { useLocation } from "react-router-dom";
import { Trip } from "../models/Trip";
import '../styles/ShowTrip.css'; // Додайте новий файл стилів
import Navbar from "../components/NavbarComponent.tsx";
import Footer from "../components/main/Footer/Footer.tsx";
import { Nav } from "react-bootstrap";

const ShowTrip: React.FC = () => {
    const { state } = useLocation();
    const trip: Trip = state || {};

    // Function to analyze the options and return a list of features
    const getTripFeatures = (options: Trip['options']) => {
        const features: string[] = [];

        if (options.maxTwoPassengers) {
            features.push("Максимально двоє осіб на задньому сидінні");
        }
        else
        {
            features.push("Можуть бути троє осіб на задньому сидінні");
        }
        if (options.womenOnly) {
            features.push("Тільки для жінок");
        }
        else
        {
            features.push("Для всіх");
        }
        // Add more conditions for other options here if needed

        return features;
    };

    const tripFeatures = getTripFeatures(trip.options);

    return (
        <main className="main">
            <Navbar />
            <div className="show-trip-container">
                <h1 className="show-trip-title">Вівторок, 10 вересня</h1>
                <div className="show-trip-details">
                    <div className="show-trip-route">
                        <div className="location2">
                            <span>{trip.startTravelPoint.city}</span>
                            <div className="lineT2 t1"></div>
                            <span className="duration2">{trip.tripDurationAndDistance.duration}</span>
                            <div className="lineT2 t2"></div>
                            <span>{trip.finishTravelPoint.city}</span>
                        </div>
                        <div className="time2">
                            <span>{trip.departureTime.slice(0, 5)}</span>
                            <span className="sec">{trip.departureTime.slice(0, 5)}</span>
                        </div>
                    </div>

                    <div className="lineUser f1"></div>
                    <div className="profile-header2">
                        <i className="bi bi-person-circle profile-icon2"></i>
                        <div className="profile-info2">
                            <span className="username2">{trip.user.name}</span>
                        </div>
                        <Nav.Link href="/profile" className=" nav2">
                            <i className="bi bi-chevron-right"></i>
                        </Nav.Link>
                    </div>
                    <div className="lineUser"></div>

                    <div className="show-trip-info">
                        <span className="show-trip-features">
                            {tripFeatures.length > 0 ? tripFeatures.join(" | ") : "Стандартні умови"}
                        </span>
                    </div>
                    <div className="lineUser f1"></div>
                    <div className="show-trip-price">
                        <span>Усього за поїздку:</span>
                        {trip.price}₴
                    </div>
                </div>
                <button className="show-trip-book-button">Забронювати</button>
            </div>
            <Footer />
        </main>
    );
};

export default ShowTrip;
