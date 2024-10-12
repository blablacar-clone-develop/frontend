import React, { useRef, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Loader } from '@googlemaps/js-api-loader';
import CalendarInput from './Calendar';
import DropDownForm from './CountPassenger';
import '../styles/homePage.css';
import { useNavigate } from "react-router-dom";

interface SearchPanelProps {
    info: {
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
            passengers?: any[];
        };
    };
}

const SearchPanel: React.FC<SearchPanelProps> = ({ info }) => {
    // Set initial values and check for undefined 'info' and 'info.ob'
    const initialFromPlace = info?.ob.from || { city: '', country: '', address: '' };
    const initialToPlace = info?.ob.to || { city: '', country: '', address: '' };

    const searchInputRefFrom = useRef<HTMLInputElement>(null);
    const searchInputRefTo = useRef<HTMLInputElement>(null);
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "KeyNOTfound";
    const [selectedDay, setSelectedDay] = useState<Date | null>(info?.ob.date || null);
    const [passengers, setPassengers] = useState<any[]>(info?.ob.passengers || []);
    const navigate = useNavigate();

    const [fromPlace, setFromPlace] = useState<{ city: string; country: string; address: string } | null>(initialFromPlace);
    const [toPlace, setToPlace] = useState<{ city: string; country: string; address: string } | null>(initialToPlace);

    useEffect(() => {
        const loader = new Loader({
            apiKey: API_KEY,
            version: 'weekly',
            libraries: ['places', 'marker'],
        });

        loader.load().then(() => {
            if (searchInputRefFrom.current && window.google) {
                const autocompleteFrom = new window.google.maps.places.Autocomplete(searchInputRefFrom.current, {
                    types: ['geocode'],

                });

                autocompleteFrom.addListener('place_changed', () => {
                    const place = autocompleteFrom.getPlace();
                    if (place.geometry) {
                        const city = place.address_components?.find(component =>
                            component.types.includes('locality')
                        )?.long_name || '';

                        const country = place.address_components?.find(component =>
                            component.types.includes('country')
                        )?.long_name || '';

                        setFromPlace({
                            city,
                            country,
                            address: place.formatted_address || searchInputRefFrom.current?.value || ''
                        });
                    }
                });
            }

            if (searchInputRefTo.current && window.google) {
                const autocompleteTo = new window.google.maps.places.Autocomplete(searchInputRefTo.current, {
                    types: ['geocode'],

                });

                autocompleteTo.addListener('place_changed', () => {
                    const place = autocompleteTo.getPlace();
                    if (place.geometry) {
                        const city = place.address_components?.find(component =>
                            component.types.includes('locality')
                        )?.long_name || '';

                        const country = place.address_components?.find(component =>
                            component.types.includes('country')
                        )?.long_name || '';

                        setToPlace({
                            city,
                            country,
                            address: place.formatted_address || searchInputRefTo.current?.value || ''
                        });
                    }
                });
            }
        }).catch(e => {
            console.error('Failed to load Google Maps API:', e);
        });
    }, []);


    const handleSearch = async () => {
        if (!fromPlace || !toPlace) {
            console.error('Please select valid From and To locations.');
            return;
        }

        const ob = {
            from: fromPlace,
            to: toPlace,
            date: selectedDay,
            passengers
        };

        navigate("/searchResult", { state: { ob } });
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
                        defaultValue={info?.ob.from?.address || ''}
                    />
                    <span className="iconS M"></span>
                </div>
                <div className="input-container">
                    <input
                        ref={searchInputRefTo}
                        type="text"
                        placeholder="To"
                        className="location-input"
                        defaultValue={info?.ob.to?.address || ''}
                    />
                    <span className="iconS M"></span>
                </div>

                <CalendarInput selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
                <DropDownForm setPassengers={setPassengers} initialPassengers={info?.ob.passengers || []} />
                <Button className="mb-2 butSearch" onClick={handleSearch}>Search</Button>
            </Form>
        </div>
    );
};

export default SearchPanel;
