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
    const info = location.state;
    const API_URL = import.meta.env.VITE_BASE_URL_API || "";
    const [trips, setTrips] = useState<Trip[]>([]);
    const [, setLoading] = useState<boolean>(true);
    const [sortOption, setSortOption] = useState<string>('earliest');
    const [filters, setFilters] = useState<{ departureTimes: string[], conveniences: string[] }>({
        departureTimes: [],
        conveniences: []
    });

    const formatDate = (date: Date | null): string => {
        if(date == null) return "";

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Місяці йдуть від 0 до 11
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`; // Формат YYYY-MM-DD
    };

    useEffect(() => {
        console.log(info);
        const fetchTrips = async () => {

            try {
                // Перевіряємо, чи дата є рядком, і перетворюємо її на об'єкт Date
                if (typeof info.ob.date === "string") {
                    info.ob.date = new Date(info.ob.date);
                }

                info.ob.date = formatDate(info.ob.date);

                const response = await axios.post<Trip[]>(`${API_URL}/api/trips/getSearchTrip`, info.ob);
                console.log(response.data);
                setTrips(response.data);
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

    // Функція для обробки фільтрів
    const handleFiltersChange = (filters: { departureTimes: string[], conveniences: string[] }) => {
        setFilters(filters);
    };

    const parseDuration = (duration: string) => {
        const regex = /(\d+)\s*год|(\d+)\s*хв/g;
        let match;
        let totalMinutes = 0;

        while ((match = regex.exec(duration)) !== null) {
            if (match[1]) {
                totalMinutes += parseInt(match[1], 10) * 60;
            }
            if (match[2]) {
                totalMinutes += parseInt(match[2], 10);
            }
        }

        return totalMinutes;
    };

    // Функція для фільтрації поїздок
    const filterTrips = (trips: Trip[]) => {
        return trips.filter(trip => {
            const matchesTime = filters.departureTimes.length === 0 || filters.departureTimes.some(time => {
                if (time === "06:00 - 12:00") return trip.departureTime >= "06:00" && trip.departureTime <= "12:00";
                if (time === "12:01 - 18:00") return trip.departureTime > "12:00" && trip.departureTime <= "18:00";
                if (time === "After 18:00") return trip.departureTime > "18:00";
                return false;
            });

            //const matchesConvenience = filters.conveniences.length === 0 || filters.conveniences.every(conv => trip.conveniences.includes(conv));

            //return matchesTime && matchesConvenience;
            return matchesTime;
        });
    };

    // Функція для відсортування поїздок
    const sortTrips = (trips: Trip[], option: string) => {
        const filteredTrips = filterTrips(trips);

        switch (option) {
            case 'earliest':
                return filteredTrips.slice().sort((a, b) => {
                    const timeA = new Date(`1970-01-01T${a.departureTime}Z`).getTime();
                    const timeB = new Date(`1970-01-01T${b.departureTime}Z`).getTime();
                    return timeA - timeB;
                });
            case 'lowestPrice':
                return filteredTrips.sort((a, b) => a.price - b.price);
            case 'closeToDestination':
                return filteredTrips;
            case 'closeToDeparture':
                return filteredTrips;
            case 'shortestTrip':
                return filteredTrips.slice().sort((a, b) => {
                    const durationA = parseDuration(a.tripDurationAndDistance.duration);
                    const durationB = parseDuration(b.tripDurationAndDistance.duration);
                    return durationA - durationB;
                });
            default:
                return filteredTrips;
        }
    };

    const sortedTrips = sortTrips(trips, sortOption);

    return (
        <main className="main">
            <Navbar />
            <div className="con">
                <SearchPanel info={info} />
            </div>
            <div className="app-container8">
                <div className="sidebar">
                    <Options
                        onSortChange={handleSortChange}
                        onFiltersChange={handleFiltersChange}
                    />
                </div>
                <div className="ride-list">

                    <Trips rides={sortedTrips} info={info} />

                </div>
            </div>
            <Footer />
        </main>
    );
};

export default SearchResult;

