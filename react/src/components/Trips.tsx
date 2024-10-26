import React from "react";
import Tripp from "../components/Trip.tsx";
import '../styles/Trips.css';
import { Trip } from "../models/Trip";
import { useNavigate } from "react-router-dom";

interface TripsProps {
    rides: Trip[];
    info: any;
}

const Trips: React.FC<TripsProps> = ({ rides, info }) => {
    const navigate = useNavigate();

    const handleTripClick = (trip: Trip) => {
       /* if (!info || Object.keys(info).length === 0) {
            navigate("/pageTrip");
        }*/
        if (!info || Object.keys(info).length === 0) {
            return;
        }
        navigate("/trip", { state: { trip, info } });
    };

    return (
        <div className="rideList">
            {rides.length > 0 ? (
                rides.map((ride, index) => (
                    <div key={index} onClick={() => handleTripClick(ride)}>
                        <Tripp
                            departureTime={ride.departureTime}
                            cityFrom={ride.startTravelPoint.city}
                            cityTo={ride.finishTravelPoint.city}
                            driverName={ride.user.name}
                            price={ride.price}
                            seatsAvailable={ride.passengerCount}
                            date={ride.departureDate}
                            travelDuration={ride.tripDurationAndDistance.duration}
                            avatar={ride.user.avatar?.url}
                            amenities={ride.amenities}
                        />
                    </div>
                ))
            ) : (
                <p>No rides available</p>
            )}
        </div>
    );
};

export default Trips;
