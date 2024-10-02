import React from "react";
import Tripp from "../components/Trip.tsx";
import '../styles/Trips.css';
import { Trip } from "../models/Trip";
import { useNavigate } from "react-router-dom"; // Додайте цей імпорт

interface TripsProps {
    rides: Trip[];
}

const Trips: React.FC<TripsProps> = ({ rides }) => {
    const navigate = useNavigate(); // Ініціалізуйте useNavigate

    const handleTripClick = (trip: Trip) => {

        navigate("/trip", {state: trip});
    };

    return (
        <div className="rideList">
            {rides.length > 0 ? (
                rides.map((ride, index) => (
                    <div key={index} onClick={() => handleTripClick(ride)}> {/* Додайте обробник натискання */}
                        <Tripp
                            departureTime={ride.departureTime}
                            cityFrom={ride.startTravelPoint.city}
                            cityTo={ride.finishTravelPoint.city}
                            driverName={ride.user.name}
                            price={ride.price}
                            seatsAvailable={ride.availableSeats}
                            date={ride.departureDate}
                            travelDuration={ride.tripDurationAndDistance.duration}
                        />
                    </div>
                ))
            ) : (
                <p>Немає доступних поїздок</p>
            )}
        </div>
    );
};

export default Trips;
