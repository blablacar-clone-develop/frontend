import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Додаємо useNavigate
import { Loader } from "@googlemaps/js-api-loader";
import "../styles/RouteSelection.css";
import {fetchUserData} from "../utils/tokenUtils.ts";

const RouteSelection: React.FC = () => {
    const location = useLocation();

    const { fromAddress, toAddress} = location.state || { };

    const navigate = useNavigate(); // Використовуємо для переходу на іншу сторінку

    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
    const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const directionsRenderers = useRef<google.maps.DirectionsRenderer[]>([]);
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "KeyNOTfound";

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData(navigate);

        };
        fetchData();
    }, []);

    useEffect(() => {
        const loader = new Loader({
            apiKey: API_KEY,
            version: 'weekly',
            libraries: ['places', 'marker'],
        });

        loader.load().then(() => {
            const directionsService = new window.google.maps.DirectionsService();
            const map = new window.google.maps.Map(mapRef.current!, {
                center: { lat: 49.8397, lng: 24.0297 },
                zoom: 7,
            });
            console.log(toAddress);
            if (fromAddress?.fullAddress && toAddress?.fullAddress) {
                const request: google.maps.DirectionsRequest = {
                    origin: fromAddress?.fullAddress,
                    destination: toAddress?.fullAddress,
                    travelMode: google.maps.TravelMode.DRIVING,
                    provideRouteAlternatives: true,
                };

                directionsService.route(request, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK && result) {
                        setRoutes(result.routes);
                        directionsRenderers.current.forEach(renderer => renderer.setMap(null));
                        directionsRenderers.current = [];

                        result.routes.forEach((route, index) => {
                            const directionsRenderer = new window.google.maps.DirectionsRenderer({
                                map: map,
                                directions: result,
                                routeIndex: index,
                                polylineOptions: {
                                    strokeColor: index === selectedRoute ? 'blue' : 'gray',
                                    strokeOpacity: 0.6,
                                    strokeWeight: 6,
                                },
                            });
                            directionsRenderers.current.push(directionsRenderer);
                        });
                    } else {
                        console.error("Directions request failed due to ", status);
                    }
                });
            }
        });
    }, [fromAddress, toAddress, API_KEY, selectedRoute]);

    const handleSelectRoute = (index: number) => {
        setSelectedRoute(index);
        directionsRenderers.current.forEach((renderer, rendererIndex) => {
            renderer.setOptions({
                polylineOptions: {
                    strokeColor: rendererIndex === index ? 'blue' : 'gray',
                },
            });
        });
    };

    const handleSubmit = () => {
        if (selectedRoute !== null) {
            const routeInfo = {
                duration: routes[selectedRoute].legs[0].duration.text,
                distance: routes[selectedRoute].legs[0].distance.text,
            };
            console.log(fromAddress);
            console.log(toAddress);

            navigate("/dateSelection", {
                state: {
                    fromAddress: fromAddress,
                    toAddress,
                    selectedRoute: routeInfo,
                },
            });
        } else {
            alert("Будь ласка, виберіть маршрут");
        }
    };

    return (
        <div className="container5">
            <div className="left-container">
                <h2 className="quest">What is your route?</h2>
                <div>
                    {routes.map((route, index) => (
                        <div key={index}>
                            <input
                                type="radio"
                                name="route"
                                id={`route-${index}`}
                                onChange={() => handleSelectRoute(index)}
                            />
                            <label htmlFor={`route-${index}`}>
                                {route.legs[0].duration.text} - {route.legs[0].distance.text}
                            </label>
                        </div>
                    ))}
                </div>
                <button className="continue-button4" onClick={handleSubmit}>
                    Продовжити
                </button>
            </div>
            <div className="map-container">
                <div ref={mapRef} className="map"/>
            </div>

        </div>
    );
};

export default RouteSelection;
