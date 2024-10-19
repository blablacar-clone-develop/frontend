import React from "react";
import '../styles/Trip.css';
import {calculateArrivalTime} from "../utils/calculateArrivalTime.ts";

interface TripProps {
    departureTime: string;
    driverName: string;
    price: number;
    seatsAvailable: number;
    date: string;
    cityFrom: string;
    cityTo: string;
    travelDuration: string; // New prop for duration
    avatar: string;
}

const Trip: React.FC<TripProps> = ({
                                       departureTime,
                                       driverName,
                                       price,
                                       seatsAvailable,
                                       date,
                                       cityFrom,
                                       cityTo,
                                       travelDuration
                                   }) => {
    return (
        <div className="card6">
            <div className="info6">
                <div className="location">
                    <span className="town">{cityFrom}</span>
                    <div className="lineT"></div>
                    <span className="duration">{travelDuration}</span>
                    <div className="lineT"></div>
                    <span className="town">{cityTo}</span>
                </div>
                <div className="time">
                    <div className="departureTime">{departureTime.slice(0, 5)}</div>
                    <div className="departureTime">{calculateArrivalTime(departureTime, travelDuration)}</div>

                </div>
                <div className="driver">

                    <span>{driverName}</span>
                    <span>{date}</span>
                    <span>Maximum {seatsAvailable} persons</span>
                </div>
            </div>
            <div className="price">{price}₴</div>

        </div>
    );
};

export default Trip;