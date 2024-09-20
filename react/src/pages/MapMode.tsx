import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from '@googlemaps/js-api-loader';
import '../styles/MapMode.css';
import axios from "axios";

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
    const [currentAddress, setCurrentAddress] = useState<string>(loc || '');
    const [showContinue, setShowContinue] = useState<boolean>(false);
    const [firstMovementDetected, setFirstMovementDetected] = useState<boolean>(false);
    const mapRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
    const markerRef = useRef<google.maps.Marker | null>(null);
    const mapInstance = useRef<google.maps.Map | null>(null);
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "KeyNOTfound";

    const customMapStyles = [
        {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#ffffff" }]
        },
        {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#000000" }]
        },
        {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [{ color: "#808080" }]
        },
        {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#2c5a71" }]
        },
    ];

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
                    console.error('Помилка під час отримання даних користувача:', error);
                }
            }
        };

        fetchUserData();

        const loader = new Loader({
            apiKey: API_KEY,
            version: 'weekly',
            libraries: ['places', 'marker'],
        });

        loader.load().then(() => {
            if (loc && window.google) {
                const geocoder = new window.google.maps.Geocoder();

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
                            disableDefaultUI: true,
                            styles: customMapStyles,
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
                                geocoder.geocode({ location: center.toJSON() }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                                    if (status === 'OK' && results[0]) {
                                        setCurrentAddress(results[0].formatted_address);
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
                    if (input.length > 2) {
                        setFirstMovementDetected(true);
                        setShowContinue(true);
                        autocompleteService.getPlacePredictions({ input }, (predictions, status) => {
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
                inputRef.current?.addEventListener('input', handleInputChange);
            }
        }).catch(e => {
            console.error('Не вдалося завантажити Google Maps API:', e);
        });
    }, [loc, firstMovementDetected]);

    const handleSuggestionClick = (description: string) => {
        const geocoder = new window.google.maps.Geocoder();

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


        if (step.step === "from") {
            navigate('/createTravel', {
                state: {
                    fromAddress: currentAddress,
                    step: "to"
                }
            });
        } else if (step.step === "to") {
            navigate('/routeSelection', {
                state: {
                    fromAddress: fromLoc,
                    toAddress: currentAddress

                }
            });
        }
    };

    return (
        <main className="main2">
            <div className="left-container">
                <h2>Локація: {loc}</h2>

                <input
                    ref={inputRef}
                    value={currentAddress}
                    onChange={(e) => setCurrentAddress(e.target.value)}
                    type="text"
                    placeholder="Введіть адресу або місце"
                    className="input-field"
                />

                <div className="suggestions-container">
                    {suggestions.map((suggestion) => (
                        <div
                            key={suggestion.place_id}
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(suggestion.description)}
                        >
                            {suggestion.description}
                        </div>
                    ))}
                </div>

                {showContinue && (
                    <button className="continue-button" onClick={handleContinue}>
                        Продовжити
                    </button>
                )}
            </div>
            <div className="map-container">
                <div ref={mapRef} className="map" />
            </div>
        </main>
    );
};

export default MapMode;
