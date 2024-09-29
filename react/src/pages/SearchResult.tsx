import React, {useEffect, useState} from "react";
import Navbar from "../components/NavbarComponent.tsx";
import Footer from "../components/main/Footer/Footer.tsx";
import SearchPanel from "../components/SearchPanel.tsx";
import { Card, Button, Form, Col, Row } from 'react-bootstrap';
import "../styles/SearchResult.css";

const SearchResult: React.FC = ()=>
{
    const [trips, setTrips] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filters, setFilters] = useState({ departureTime: '', priceRange: '', trust: '', amenities: [] });

    useEffect(() => {
        const fetchTrips = async () => {
            /*try {
                const response = await fetch('/api/trips/getSearchTrip'); // Ваш реальний API
                const data = await response.json();
                setTrips(data);
            } catch (error) {
                console.error('Error fetching trips:', error);
            } finally {
                setLoading(false);
            }*/
        };

        fetchTrips();
    }, []);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    return (
     <main className="main">
         <Navbar/>
         <SearchPanel/>
         <Options/>
         <Footer/>
     </main>
 );

};
export default SearchResult