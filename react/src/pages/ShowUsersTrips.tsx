import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {Trip} from "../models/Trip.tsx";
import axios from "axios";
import {fetchUserData} from "../utils/tokenUtils.ts";
import Trips from "../components/Trips.tsx";
import Navbar from "../components/NavbarComponent.tsx";
import "../styles/ShowUsersTrips.css";

const ShowUsersTrips = () => {
    const searchParams = new URLSearchParams(location.search);
    const tripType = searchParams.get('type');
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_BASE_URL_API || "";
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData(navigate);
        };
        fetchData();
        const fetchTrips = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/api/trips/users`, {
                    params: {
                        type: tripType,
                        userId: localStorage.getItem("userId"),
                    },
                });
                setTrips(response.data);
                setLoading(false);
            } catch (err) {
                setError("Error fetching trips");
                setLoading(false);
            }
        };

        fetchTrips();
    }, [tripType]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <main className="main">
            <Navbar/>
        <main className="main12">

            <h1 className="headerTrips">{tripType === 'created' ? 'Created Trips' : 'Reserved Trips'}</h1>
            <div className="ride-list">
                <Trips rides={trips} info={null}/>

            </div>


        </main>
        </main>
    );
};
export default ShowUsersTrips;