import React from "react";
import Tripp from "../components/Trip.tsx";
import '../styles/Trips.css';

import { Trip } from "../models/Trip"; // Import the correct type for rides

// Define the props interface for the Trips component
interface TripsProps {
    rides: Trip[]; // Define rides as an array of Ride
}
const Trips: React.FC<TripsProps> = ({ rides }) => {
    return (
        <div className="rideList">
            {rides.length > 0 ? ( // Check if rides exist
                rides.map((ride, index) => (
                    <Tripp
                        key={index}
                        departureTime={ride.departureTime}
                        cityFrom = {ride.startTravelPoint.city}
                        cityTo = {ride.finishTravelPoint.city}
                        driverName={ride.user.name}
                        price={ride.price}
                        seatsAvailable={ride.availableSeats}
                        date={ride.departureDate}
                        travelDuration={ride.tripDurationAndDistance.duration}
                    />
                ))
            ) : (
                <p>Немає доступних поїздок</p> // Message if no rides are available
            )}
        </div>
    );
};

export default Trips;
