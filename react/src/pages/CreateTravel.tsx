import React, { useEffect, useRef, useState } from 'react';

import { Loader } from '@googlemaps/js-api-loader';
import "../styles/CreateTravel.css";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchUserData } from "../utils/tokenUtils.ts";
import NavbarComponent from "../components/NavbarComponent.tsx";

const CreationTravel: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchInputRefFrom = useRef<HTMLInputElement>(null);
    const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "KeyNOTfound";
    const step = location.state?.step || 'from';
    const fromLoc = location.state?.fromAddress || '';

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData(navigate);
        };

        fetchData();

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
                        autocompleteService.getPlacePredictions({ input, language: 'uk' }, (predictions, status) => {
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
        console.log(fromLoc);
        console.log(loc);
        navigate('/mapMode', { state: { fromLoc, loc, step } });
    };

    return (
        <main className="main">
            <NavbarComponent />
            <div className="globalDiv">
                <h3 className="titleFrom"> Where are you leaving from?</h3>
                <div className="divInput">
                    <input
                        ref={searchInputRefFrom}
                        type="text"
                        placeholder={step === "from" ? "From" : "To"}
                        className="inputs6"
                    />
                    <span className="iconS S"></span>
                </div>
                <div className="suggestions-container22">
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
                            <span className="iconS8 ico8"></span>
                            <span className="locSug">{suggestion.description}</span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default CreationTravel;
