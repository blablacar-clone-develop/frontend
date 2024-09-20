import React, { useEffect, useRef, useState } from 'react';
import Navbar from "../components/NavbarComponent.tsx";
import { Loader } from '@googlemaps/js-api-loader';
import "../styles/CreateTravel.css";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";


const CreationTravel: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchInputRefFrom = useRef<HTMLInputElement>(null);
    const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "KeyNOTfound";
    const step =location.state || { step: 'from' };
    const fromLoc =location.state || { fromLoc: '' };
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8080/api/user', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.data === "token") {
                        localStorage.removeItem('token');
                        localStorage.removeItem('username');
                        localStorage.removeItem('userId');
                        navigate("/login");
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        }
        fetchUserData();
                const loader = new Loader({
                    apiKey: API_KEY,
                    version: 'weekly',
                    libraries: ['places', 'marker'],
                });

                loader.load().then(() => {
                    if (searchInputRefFrom.current && window.google) {
                        const autocompleteService = new window.google.maps.places.AutocompleteService();
                        const handleInputChange = () => {
                            const input = searchInputRefFrom.current?.value || '';
                            if (input.length > 2) {
                                autocompleteService.getPlacePredictions({input}, (predictions, status) => {
                                    if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                                        setSuggestions(predictions);
                                    } else {
                                        setSuggestions([]);
                                    }
                                });
                            } else {
                                setSuggestions([]);
                            }
                        };
                        searchInputRefFrom.current?.addEventListener('input', handleInputChange);
                    }
                }).catch(e => {
                    console.error('Failed to load Google Maps API:', e);
                });


    }, []);
    const handleSelectFrom = (loc: string) => {


                navigate('/mapMode', { state: { fromLoc, loc, step } });
    };
    return (
        <main className="main">
            <Navbar />
            <div className="divInput">
            <input
                ref={searchInputRefFrom}
                type="text"
                placeholder="Відправка з"
                className="me-2 flex-fill mb-2 inputs"
            />
            </div>
            <div className="suggestions-container2">
                {suggestions.map((suggestion) => (
                    <div
                        key={suggestion.place_id}
                        className="suggestion-item2"
                        onClick={() => {
                            setSuggestions([]);
                            if (searchInputRefFrom.current) {
                                searchInputRefFrom.current.value = suggestion.description;
                            }
                            handleSelectFrom(searchInputRefFrom.current.value);
                        }}
                    >
                        {suggestion.description}
                        <span className="suggestion-icon2">&gt;</span>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default CreationTravel;
