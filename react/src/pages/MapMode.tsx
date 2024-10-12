import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from '@googlemaps/js-api-loader';
import '../styles/MapMode.css';
import {fetchUserData} from "../utils/tokenUtils.ts";
import NavbarComponent from "../components/NavbarComponent.tsx";

declare global {
    interface Window {
        google: typeof google;
    }
}

const MapMode: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { fromLoc, loc, step } = location.state || { fromLoc: '', loc: '', step: 'from' };
    const [myLatitude, setMyLatitude] = useState<number | null>(null);
    const [myLongitude, setMyLongitude] = useState<number | null>(null);
    const [currentAddress, setCurrentAddress] = useState<string>(loc || null);
    const [row, setRow] = useState<string>("Where you would like to meet the passengers?");
    const [country, setCountry] = useState<string | null>(null);
    const [city, setCity] = useState<string | null>(null);

    const [showContinue, setShowContinue] = useState<boolean>(false);
    const [firstMovementDetected, setFirstMovementDetected] = useState<boolean>(false);
    const mapRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
    const markerRef = useRef<google.maps.Marker | null>(null);
    const mapInstance = useRef<google.maps.Map | null>(null);
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "KeyNOTfound";



    useEffect(() => {
        console.log(fromLoc);
        console.log(loc);

        const fetchData = async () => {
            await fetchUserData(navigate);
        };

        fetchData();

        const loader = new Loader({
            apiKey: API_KEY,
            version: 'weekly',
            libraries: ['places', 'marker'],
        });
        if(step === "to")
            setRow("Where you would like to drop off passengers?")
        loader.load().then(() => {
            if (loc && window.google) {
                const geocoder = new window.google.maps.Geocoder();

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                geocoder.geocode({ address: loc }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                    if (status === 'OK' && results[0]) {
                        const location = results[0].geometry.location;
                        setMyLatitude(location.lat());
                        setMyLongitude(location.lng());
                        setCurrentAddress(results[0].formatted_address);

                        // Ініціалізація карти
                        mapInstance.current = new window.google.maps.Map(mapRef.current!, {
                            zoom: 16,
                            center: location,
                            gestureHandling: 'greedy',
                            disableDefaultUI: true
                        });

                        markerRef.current = new window.google.maps.Marker({
                            position: location,
                            map: mapInstance.current,
                            draggable: false,
                        });

                        const detectFirstMovement = () => {
                            if (!firstMovementDetected) {
                                setFirstMovementDetected(true);
                                setShowContinue(true);
                            }
                        };

                        mapInstance.current.addListener("center_changed", () => {
                            const center = mapInstance.current!.getCenter();
                            if (center && markerRef.current) {
                                markerRef.current.setPosition(center);
                            }
                        });

                        mapInstance.current.addListener("idle", () => {
                            const center = mapInstance.current!.getCenter();
                            if (center) {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error
                                geocoder.geocode({ location: center.toJSON() }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                                    if (status === 'OK' && results[0]) {
                                        setCurrentAddress(results[0].formatted_address);
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        setCountry(results[0].address_components.find(f => f.types.includes('country')).long_name || 'unknown');
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        setCity(results[0].address_components.find(f => f.types.includes('locality')).long_name || 'unknown');
                                    } else {
                                        console.error('Не вдалося знайти адресу для даних координат:', status);
                                    }
                                });
                            }
                        });

                        mapInstance.current.addListener("dragstart", detectFirstMovement);
                    } else {
                        console.error('Geocode не був успішним через:', status);
                    }
                });
            }
        }).catch(e => {
            console.error('Не вдалося завантажити Google Maps API:', e);
        });

        loader.load().then(() => {
            if (inputRef.current && window.google) {
                const autocompleteService = new window.google.maps.places.AutocompleteService();
                const handleInputChange = () => {

                    const input = inputRef.current?.value || '';

                        setFirstMovementDetected(true);
                        setShowContinue(true);
                        autocompleteService.getPlacePredictions({ input }, (predictions, status) => {
                            if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                                setSuggestions(predictions);
                            } else {
                                setSuggestions([]);
                            }
                        });

                };
                inputRef.current?.addEventListener('input', handleInputChange);
            }
        }).catch(e => {
            console.error('Не вдалося завантажити Google Maps API:', e);
        });
    }, [loc, firstMovementDetected]);

    const handleSuggestionClick = (description: string) => {
        const geocoder = new window.google.maps.Geocoder();


        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        geocoder.geocode({ address: description }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
            if (status === 'OK' && results[0]) {
                const newLocation = results[0].geometry.location;
                setMyLatitude(newLocation.lat());
                setMyLongitude(newLocation.lng());
                setCurrentAddress(results[0].formatted_address);

                if (mapInstance.current) {
                    mapInstance.current.setCenter(newLocation);
                    if (markerRef.current) {
                        markerRef.current.setPosition(newLocation);
                    } else {
                        markerRef.current = new window.google.maps.Marker({
                            position: newLocation,
                            map: mapInstance.current,
                        });
                    }
                }
            } else {
                console.error('Geocode не був успішним через:', status);
            }
        });

        setSuggestions([]);
        if (inputRef.current) {
            inputRef.current.value = description;
        }
    };

    const handleContinue = () => {

        const ob = {
            fullAddress:  currentAddress,
            longitude: myLongitude,
            latitude: myLatitude,
            city: city,
            country: country
        };

        console.log(ob.fullAddress)

        if (step === "from") {
            navigate('/createTravel', {
                state: {
                    fromAddress: ob,
                    step: "to"
                }
            });

        } else if (step=== "to") {
            navigate('/routeSelection', {
                state: {
                    fromAddress: fromLoc,
                    toAddress: ob,
                }
            });
        }

    };

    return (
        <main className="main">
            <NavbarComponent />
        <main className="main2">
            <div className="left-container">
                <h2 className="quest">{row}</h2>

                <input
                    ref={inputRef}
                    value={currentAddress}
                    onChange={(e) => setCurrentAddress(e.target.value)}
                    type="text"
                    placeholder="Введіть адресу або місце"
                    className="input-field"
                />


                <div className="suggestions-container22">
                    {suggestions.map((suggestion) => (
                        <div
                            key={suggestion.place_id}
                            className="suggestion-item2"
                            onClick={() => handleSuggestionClick(suggestion.description)}
                        >
                            <span className="iconS8 ico8"></span>
                            <span className="locSug">{suggestion.description}</span>
                        </div>
                    ))}
                </div>

                {showContinue && (
                    <button className="continue-button4" onClick={handleContinue}>
                        Продовжити
                    </button>
                )}
            </div>
            <div className="map-container">
                <div ref={mapRef} className="map"/>
            </div>
        </main>
        </main>
    );
};

export default MapMode;
