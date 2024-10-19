import React from "react";
import '../styles/Trip.css';
import {calculateArrivalTime, formatTravelDuration} from "../utils/calculateArrivalTime.ts";
import {Amenities} from "../models/Amenities.tsx";

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
    amenities: Amenities;

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
                                       avatar,
                                       amenities
                                   }) => {


    // Маппінг значень зручностей для відображення
    const availableAmenities = [
        { key: 'wifi', label: 'Wi-Fi', icon: 'wifi-icon-class' },
        { key: 'smoking', label: 'Smoking Allowed', icon: 'smoking-icon-class' },
        { key: 'eTickets', label: 'Electronic Tickets', icon: 'ticket-icon-class' },
        { key: 'airConditioning', label: 'Air Conditioning', icon: 'aircon-icon-class' },
        { key: 'petsAllowed', label: 'Pets Allowed', icon: 'pets-icon-class' },
        { key: 'foodProvided', label: 'Food Provided', icon: 'food-icon-class' }
    ];

    // Фільтрація та рендер тих зручностей, які true
    const renderedAmenities = availableAmenities
        .filter((amenity) => amenities[amenity.key as keyof Amenities])
        .map((amenity) => (
            <div key={amenity.key} className="amenity">
                <div className={amenity.icon + " iconAmentity padingLR5px"}/>
                {/*<span>{amenity.label}</span>*/}
            </div>
        ));

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
                        <img src={avatar} alt="Profile Avatar" className="profileAvatarInSearch"/>
                    ) : (
                        <img src={avatar} alt="Profile Avatar" className="d-none profileAvatarInSearch"/>)}
                    <span>{driverName}</span>
                    <span className="padingLR5px fzBig">|</span>
                    <div className="transportIcon"/>
                    <span className="padingLR5px fzBig">|</span>
                    <span className="padingLR5px">Maximum {seatsAvailable} persons</span>
                    <span className="padingLR5px fzBig">|</span>

                    {/* Відображення зручностей */}
                    <div className="amenities">
                        {renderedAmenities.length > 0 ? renderedAmenities : <span className="d-none">No amenities available</span>}
                    </div>

                    <span className="d-none">{date}</span>
                </div>
            </div>
            <div className="price">{price}₴</div>

        </div>
    );
};

export default Trip;