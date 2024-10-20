import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { Trip } from "../models/Trip.tsx";
import '../styles/ShowTrip.css'; // Додайте новий файл стилів
import Navbar from "../components/NavbarComponent.tsx";
import Footer from "../components/main/Footer/Footer.tsx";
import { Nav } from "react-bootstrap";
import axios from "axios";
interface Info{
        ob: {
            from?: {
                city: string;
                country: string;
                address: string;
            };
            to?: {
                city: string;
                country: string;
                address: string;
            };
            date?: Date | null;
            passengers?: any[]; // eslint-disable-line
        };
}
const Reservation: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const API_URL = import.meta.env.VITE_BASE_URL_API || "";
    const { trip, info }: { trip: Trip; info: Info } = location.state || {};
    const [modeBook, setModeBook] = useState<string>('Ви маєте чекати на підтвердження водія');
    const [endPrice, setEndPrice]  =useState<number>();
    useEffect(() => {

        setEndPrice(trip.price*info.ob.passengers?.length)
        if (trip.tripAgreement && trip.tripAgreement.isAgreed) {
            setModeBook('You will be immediately approved for this reservation');
        }
        else
        {
            setModeBook('You must wait for confirmation of your reservation');
        }
    }, [trip]);
    useEffect(() => {
        if (endPrice !== undefined) {
            localStorage.setItem("endPrice", endPrice.toString());
        }
    }, [endPrice]);
    const handleBooking = async () => {

        try {
            const userId = localStorage.getItem("userId");
            const passengers = info.ob.passengers; // Extract the list of passengers

            const response = await axios.post(`${API_URL}/api/passengers/save`, {
                userId,
                tripId: trip.id,
                passengers// Include the passengers in the request
            });

            console.log("Booking confirmed", response.data);

            navigate("/successBooking");
        } catch (error) {
            console.error("Error booking the trip:", error);
        }
    }



    return (
        <main className="main">
            <Navbar />
            <div className="show-trip-container">
                <h1 className="show-trip-title">Check the details of your trip</h1>
                <h6 className="myH">{modeBook}</h6>
                <div className="show-trip-details">
                    <div className="show-trip-route">
                        <div className="location2">
                            <span>{trip.startTravelPoint?.city}</span>
                            <div className="lineT2 t1"></div>
                            <span className="duration2">{trip.tripDurationAndDistance?.duration}</span>
                            <div className="lineT2 t2"></div>
                            <span>{trip.finishTravelPoint?.city}</span>
                        </div>
                        <div className="time2">
                            <span>{trip.departureTime?.slice(0, 5)}</span>
                            <span className="sec">{trip.departureTime?.slice(0, 5)}</span>
                        </div>
                    </div>

                    <div className="lineUser f1"></div>
                    <div className="div4">
                        <div className="profile-header3">
                            <span>Price</span>
                            <span>{info?.ob.passengers?.length} place: {endPrice}₴</span>
                            <span>Pay in car</span>
                        </div>
                        <div className="cash">
                            <span>Cash</span>
                        </div>
                    </div>
                    <div className="lineUser"></div>

                    <div className="show-trip-info"></div>
                    <div className="payCard">
                        <Nav.Link href="/payCard" >Pay card</Nav.Link>
                    </div>
                    <div className="lineUser f1"></div>

                </div>
                <button className="show-trip-book-button" onClick={handleBooking}>Забронювати</button>
            </div>
            <Footer />
        </main>
    );
};

export default Reservation;
