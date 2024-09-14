// src/components/SearchPanel.tsx
import React, { useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Loader } from '@googlemaps/js-api-loader';
import CalendarInput from './Calendar';
import DropDownForm from './CountPassenger';
import '../styles/homePage.css';

// Extend the window interface to include Google Maps types
declare global {
    interface Window {
        google: typeof google;
    }
}

const SearchPanel: React.FC = () => {

    const searchInputRefFrom = useRef<HTMLInputElement>(null);
    const searchInputRefTo = useRef<HTMLInputElement>(null);
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "KeyNOTfound";

    useEffect(() => {
        const loader = new Loader({
            apiKey: API_KEY,
            version: 'weekly',
            libraries: ['places'],
        });

        loader.load().then(() => {
            // No need for casting, as we've extended the window type above
            if (searchInputRefFrom.current && window.google) {
                const autocomplete = new window.google.maps.places.Autocomplete(searchInputRefFrom.current, {
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

    return (
        <div className="my-4 searchPanel">
            <Form className="d-flex justify-content-center flex-wrap w-100 searchForm">
                <input ref={searchInputRefFrom} type="text" placeholder="Відправка з"
                       className="me-2 flex-fill mb-2 inputs"/>
                <input ref={searchInputRefTo} type="text" placeholder="Прямуєте до"
                       className="me-2 flex-fill mb-2 inputs"/>
                <CalendarInput />
                <DropDownForm />
                <Button variant="primary" className="mb-2">Шукати</Button>
            </Form>
        </div>
    );
};

export default SearchPanel;
