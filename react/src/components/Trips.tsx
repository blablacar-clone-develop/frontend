import React from "react";
import Trip from "../components/Trip.tsx";
import '../styles/Trips.css';

interface TripsProps {
    rides: {
        time: string;
        price: number;
        seatsAvailable: number;
        vehicleType: string;
    }[];
}

const Trips: React.FC<TripsProps> = ({ rides }) => {
    return (
        <div className="rideList">
            {rides.length > 0 ? ( // Check if rides exist
                rides.map((ride, index) => (
                    <Trip
                        key={index}
                        time={ride.time}
                        driver={ride.driver}
                        price={ride.price}
                        seatsAvailable={ride.seatsAvailable}
                        vehicleType={ride.vehicleType}
                    />
                ))
            ) : (
                <p>Немає доступних поїздок</p> // Message if no rides are available
            )}
        </div>
    );
};

export default Trips;
