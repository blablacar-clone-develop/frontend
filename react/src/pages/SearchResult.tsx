import React, { useEffect, useState } from "react";
import Navbar from "../components/NavbarComponent.tsx";
import Footer from "../components/main/Footer/Footer.tsx";
import SearchPanel from "../components/SearchPanel.tsx";
import Trips from "../components/Trips.tsx";
import Options from "../components/Options.tsx";
import "../styles/SearchResult.css";
import { Trip } from "../models/Trip";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResult: React.FC = () => {
    const location = useLocation();
    const info = location.state || {};
    const API_URL = import.meta.env.VITE_BASE_URL_API || "KeyNOTfound";
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [sortOption, setSortOption] = useState<string>('earliest'); // Додано стан для зберігання параметра сортування

    useEffect(() => {
        console.log(info);
        const fetchTrips = async () => {
            try {
                const response = await axios.post<Trip[]>(`${API_URL}/api/trips/getSearchTrip`, info.ob);
                setTrips(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching trips:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, [info]);

    // Функція для обробки зміни параметра сортування
    const handleSortChange = (option: string) => {
        setSortOption(option);
    };
    const parseDuration = (duration) => {
        const regex = /(\d+)\s*год|(\d+)\s*хв/g;
        let match;
        let totalMinutes = 0;

        while ((match = regex.exec(duration)) !== null) {
            if (match[1]) {
                totalMinutes += parseInt(match[1], 10) * 60; // Додаємо години у хвилини
            }
            if (match[2]) {
                totalMinutes += parseInt(match[2], 10); // Додаємо хвилини
            }
        }

        return totalMinutes; // Повертаємо загальну тривалість у хвилинах
    };
    // Функція для відсортування поїздок
    const sortTrips = (trips: Trip[], option: string) => {
        switch (option) {
            case 'earliest':

                return trips.slice().sort((a, b) => {
                    const timeA = new Date(`1970-01-01T${a.departureTime}Z`).getTime();
                    const timeB = new Date(`1970-01-01T${b.departureTime}Z`).getTime();
                    return timeA - timeB; // Сортування за зростанням
                });
            case 'lowestPrice':
                return trips.sort((a, b) => a.price - b.price);
            case 'closeToDestination':
                // Сортування за близькістю до пункту призначення (потрібно реалізувати логіку)
                return trips; // Замініть на реальне сортування
            case 'closeToDeparture':
                // Сортування за близькістю до пункту відправлення (потрібно реалізувати логіку)
                return trips; // Замініть на реальне сортування
            case 'shortestTrip':
                return trips.slice().sort((a, b) => {
                    const durationA = parseDuration(a.tripDurationAndDistance.duration);
                    const durationB = parseDuration(b.tripDurationAndDistance.duration);
                    return durationA - durationB; // Сортування за зростанням
                });
            default:
                return trips;
        }
    };

    const sortedTrips = sortTrips(trips, sortOption); // Сортуємо поїздки в залежності від вибраного параметра

    return (
        <main className="main">
            <Navbar />
            <div className="con">
                <SearchPanel info={info} />
            </div>
            <div className="app-container8">
                <div className="sidebar">
                    <Options onSortChange={handleSortChange} /> {/* Передаємо функцію для зміни сортування */}
                </div>
                <div className="ride-list">
                    <Trips rides={sortedTrips} /> {/* Відображаємо відсортовані поїздки */}
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default SearchResult;
