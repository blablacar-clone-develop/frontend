import React, {useEffect, useState} from "react";
import Navbar from "../components/NavbarComponent.tsx";
import {calculateArrivalTime} from "../utils/calculateArrivalTime.ts";
import {Nav} from "react-bootstrap";
import Footer from "../components/main/Footer/Footer.tsx";
import {useLocation} from "react-router-dom";
import {Trip} from "../models/Trip.tsx";
import "../styles/TripDetails.css";

import axios from "axios";
import {Passenger} from "../models/Passenger.tsx";

const TripDetails: React.FC = ()=>
{
    const location = useLocation();
    const tripId = location.state || {};
    const API_URL = import.meta.env.VITE_BASE_URL_API || "";
    const [trip, setTrip] =  useState<Trip | null>(null);
    const [passengers, setPassengers] = useState<Passenger[]>([]);
    const getTripFeatures = (options: Trip["options"] | undefined) => {

        const features: string[] = [];

        if (options?.maxTwoPassengers) {
            features.push("A maximum of two people in the back seat");
        } else {
            features.push("There can be three people in the back seat");
        }
        if (options?.womenOnly) {
            features.push("Only for women");
        } else {
            features.push("For everyone");
        }
        if (trip?.tripAgreement?.isAgreed) {
            features.push("Instant booking");
        } else {
            features.push("You have to wait for confirmation");
        }

        return features;
    };
    useEffect(() => {
        console.log(tripId?.tripId);
        const fetchTripData = async () => {
            try {
                const response = await axios.get<Trip>(`${API_URL}/api/trips/getTripById/${tripId?.tripId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setTrip(response.data);

                console.log(response.data);


            } catch (error) {
                console.error("Error fetching trip data:", error);
            }
        };

        const fetchPassengers = async () => {
            try {
                const response = await axios.get<Passenger[]>(`${API_URL}/api/trips/getPassengers/${tripId?.tripId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setPassengers(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching passengers data:", error);
            }
        };

        if (tripId) {
            fetchTripData();
            fetchPassengers();
        }
    }, [tripId, API_URL]);
    const tripFeatures = getTripFeatures(trip?.options);
    return(
        <main className="main">
            <Navbar/>
            <div className="show-trip-container">
                <h1 className="show-trip-title">{trip?.departureDate}</h1>
                <div className="show-trip-details">
                    <div className="show-trip-route">
                        <div className="location2">
                            <span>{trip?.startTravelPoint?.city}</span>
                            <div className="lineT2 t1"></div>
                            <span className="duration2">{trip?.tripDurationAndDistance?.duration}</span>
                            <div className="lineT2 t2"></div>
                            <span>{trip?.finishTravelPoint?.city}</span>
                        </div>
                        <div className="time2">
                            <span>{trip?.departureTime.slice(0, 5)}</span> {/* Час відправлення */}
                            <span
                                className="sec">{calculateArrivalTime(trip?.departureTime, trip?.tripDurationAndDistance?.duration)}</span>
                        </div>

                    </div>

                    <div className="lineUser f1"></div>
                    <div className="profile-header2">
                    {trip?.user?.avatar && trip?.user.avatar?.url ? (
                            <img
                                src={trip?.user?.avatar.url}
                                alt="Driver's Avatar"
                                className="profile-avatar"
                            />
                        ) : (
                            <i className="bi bi-person-circle profile-icon2"></i>
                        )}
                        <div className="profile-info2">
                            <span className="username2">{trip?.user?.name}</span>
                        </div>
                        <Nav.Link href="/profile" className=" nav2">
                            <i className="bi bi-chevron-right"></i>
                        </Nav.Link>
                    </div>
                    <div className="lineUser f1"></div>

                    <div className="show-trip-info">
                        <span className="show-trip-features">
                            {tripFeatures.length > 0 ? tripFeatures.join(" | ") : "Стандартні умови"}
                        </span>
                    </div>
                    <div className="lineUser f1"></div>
                    <div className="show-trip-passengers">
                        <h5 className="pasHeader">Passengers</h5>
                        {passengers.length > 0 ? (
                            passengers.map((passenger) => (
                                <div key={passenger.id} className="passenger">
                                    <span>{passenger.user?.name} {passenger.user?.surname}</span> —
                                    <span>Type: {passenger.passengerType}</span>
                                </div>
                            ))
                        ) : (
                            <p>No passengers for this trip</p>
                        )}
                    </div>
                    <div className="lineUser f1"></div>
                    <div className="show-trip-price">
                        <span>Total for the trip:</span>
                        {trip?.price}₴
                    </div>
                </div>

            </div>
            <Footer/>
        </main>
    );

}
export default TripDetails;