// src/components/SearchPanel.tsx
import React, { useRef, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Loader } from '@googlemaps/js-api-loader';
import CalendarInput from './Calendar';
import DropDownForm from './CountPassenger';
import '../styles/homePage.css';
import {useNavigate} from "react-router-dom";

const SearchPanel: React.FC = () => {
    const searchInputRefFrom = useRef<HTMLInputElement>(null);
    const searchInputRefTo = useRef<HTMLInputElement>(null);
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "KeyNOTfound";
    const [myLatitude, setMyLatitude] = useState<number | null>(null);
    const [myLongitude, setMyLongitude] = useState<number | null>(null);
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);
    const [passengers, setPassengers] = useState<any[]>([]); // Стан для пасажирів
    const navigate = useNavigate();
    useEffect(() => {
        const loader = new Loader({
            apiKey: API_KEY,
            version: 'weekly',
            libraries: ['places', 'marker'],
        });

        loader.load().then(() => {
            if (searchInputRefFrom.current && window.google) {
                const autocomplete = new window.google.maps.places.Autocomplete(searchInputRefFrom.current, {
                    types: ['geocode'],
                });

                autocomplete.addListener('place_changed', () => {
                    const place = autocomplete.getPlace();
                    if (place.geometry) {
                        const location = place.geometry.location!;
                        console.log('Latitude:', location.lat());
                        setMyLatitude(location.lat());
                        console.log('Longitude:', location.lng());
                        setMyLongitude(location.lng());
                    }
                });
            }

            if (searchInputRefTo.current && window.google) {
                const autocomplete = new window.google.maps.places.Autocomplete(searchInputRefTo.current, {
                    types: ['geocode'],
                });

                autocomplete.addListener('place_changed', () => {
                    const place = autocomplete.getPlace();
                    if (place.geometry) {
                        const location = place.geometry.location!;
                        console.log('Latitude:', location.lat());
                        console.log('Longitude:', location.lng());
                    }
                });
            }
        }).catch(e => {
            console.error('Failed to load Google Maps API:', e);
        });
    }, []);
    const getCoordinates = (address: string) => {
        const geocoder = new (window.google as any).maps.Geocoder();
        return new Promise((resolve, reject) => {
            geocoder.geocode({ address }, (results: any, status: any) => {
                if (status === "OK" && results[0]) {
                    const location = results[0].geometry.location;
                    resolve({ lat: location.lat(), lng: location.lng() });
                } else {
                    reject('Geocode was not successful for the following reason: ' + status);
                }
            });
        });
    };


    const handleSearch = async () => {
        const from = searchInputRefFrom.current?.value;
        const to = searchInputRefTo.current?.value;

        try {
            const fromCoordinates = await getCoordinates(from);
            const toCoordinates = await getCoordinates(to);

            const ob = {
                from: from,
                to: to,
                date: selectedDay,
                passengers: passengers,
                fromCoordinates, // Додайте координати звідки
                toCoordinates // Додайте координати куди
            };
            console.log('From Coordinates:', fromCoordinates);
            console.log('To Coordinates:', toCoordinates);
            console.log('From:', from);
            console.log('To:', to);
            console.log('Selected Day:', selectedDay);
            console.log('Selected Passengers:', passengers.filter(p => p.isChecked));
            navigate("/searchResult", { state: { ob } });

        } catch (error) {
            console.error('Error fetching coordinates:', error);
            // Можливо, ви хочете показати повідомлення про помилку тут
        }
    };
    return (
        <div className="searchPanel">
            <Form className="d-flex justify-content-center flex-wrap w-100 searchForm">
                <div className="input-container">
                    <input
                        ref={searchInputRefFrom}
                        type="text"
                        placeholder="From"
                        className="location-input"
                    />
                    <span className="iconS M"></span>
                </div>
                <div className="input-container">
                    <input ref={searchInputRefTo} type="text" placeholder="To"
                           className="location-input"/>
                    <span className="iconS M"></span>
                </div>

                {/* Додайте пропси для CalendarInput */}
                <CalendarInput selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
                {/* Додайте пропси для DropDownForm */}
                <DropDownForm setPassengers={setPassengers} />
                <Button className="mb-2 butSearch" onClick={handleSearch}>Search</Button>
            </Form>
        </div>
    );
};

export default SearchPanel;
