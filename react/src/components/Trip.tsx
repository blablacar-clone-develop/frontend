import React from "react";
import '../styles/Trip.css';
import {calculateArrivalTime, formatTravelDuration} from "../utils/calculateArrivalTime.ts";

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
                                       travelDuration,
                                        avatar
                                   }) => {
    return (
        <div className="card6">
            <div className="info6">
                <div className="location">
                    <span className="town">{cityFrom}</span>
                    <div className="lineT"></div>
                    <span className="duration">{formatTravelDuration(travelDuration)}</span>
                    <div className="lineT"></div>
                    <span className="town">{cityTo}</span>
                </div>
                <div className="time">
                    <div className="departureTime">{departureTime.slice(0, 5)}</div>
                    <div className="departureTime">{calculateArrivalTime(departureTime, travelDuration)}</div>

                </div>
                <div className="driver">

                    {avatar ? (
                        <img src={avatar} alt="Profile Avatar" className="profileAvatarInSearch" />
                    ) : (
                        <img src={avatar} alt="Profile Avatar" className="d-none profileAvatarInSearch"/>)}
                    <span>{driverName}</span>
                    <span className="padingLR5px">Maximum {seatsAvailable} persons</span>

                    <span className="d-none">{date}</span>
                </div>
            </div>
            <div className="price">{price}₴</div>

        </div>
    );
};

export default Trip;