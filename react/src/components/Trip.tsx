import React from "react";
import '../styles/Trip.css';

interface RideCardProps {
    time: string;
    driver: string;
    price: number;
    seatsAvailable: number;
    vehicleType: string;
}

const Trip: React.FC<RideCardProps> = ({ time, driver, price, seatsAvailable, vehicleType }) => {
    return (
        <div className="card6">
            <div className="info">
                <div className="location">
                    <span>Миколаїв</span>
                    <span>{time}</span>
                    <span>Одеса</span>
                </div>
                <div className="driver">
                    <span>{driver}</span>
                    <span>{vehicleType}</span>
                    <span>Максимально {seatsAvailable} осіб</span>
                </div>
            </div>
            <div className="price">{price}₴</div>
        </div>
    );
};
export default Trip;
