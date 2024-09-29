import React, { useEffect, useState } from "react";
import Navbar from "../components/NavbarComponent.tsx";
import Footer from "../components/main/Footer/Footer.tsx";
import SearchPanel from "../components/SearchPanel.tsx";
import Trips from "../components/Trips.tsx";
import Options from "../components/Options.tsx";
import "../styles/SearchResult.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResult: React.FC = () => {
    const location = useLocation();
    const info = location.state || {};
    const API_URL = import.meta.env.VITE_BASE_URL_API || "KeyNOTfound";
    const [trips, setTrips] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log(info);
        const fetchTrips = async () => {
            try {
                const response = await axios.post(`${API_URL}/api/trips/getSearchTrip`, info.ob);
                setTrips(response.data);
            } catch (error) {
                console.error("Error fetching trips:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, [info]);

    return (
        <main className="main">
            <Navbar />
            <SearchPanel info={info} />
            <div className="app-container8">
                <div className="sidebar">
                    <Options />
                </div>
                <div className="ride-list">
                    <Trips rides={trips} />
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default SearchResult;
