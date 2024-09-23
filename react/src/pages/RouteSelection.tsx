import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader";

const RouteSelection: React.FC = () => {
    const location = useLocation();
    const { fromAddress, toAddress } = location.state || { fromAddress: '', toAddress: '' };

    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
    const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "KeyNOTfound";

    useEffect(() => {
        const loader = new Loader({
            apiKey: API_KEY,
            version: 'weekly',
            libraries: ['places', 'marker'],
        });

        loader.load().then(() => {
            const directionsService = new window.google.maps.DirectionsService();
            const directionsRenderer = new window.google.maps.DirectionsRenderer();
            const map = new window.google.maps.Map(mapRef.current!, {
                center: { lat: 49.8397, lng: 24.0297 },
                zoom: 7,
            });

            directionsRenderer.setMap(map);
            console.log(fromAddress.fromAddress);
            console.log(toAddress);
            if (fromAddress && toAddress) {

                const request: google.maps.DirectionsRequest = {
                    origin: fromAddress.fromAddress,
                    destination: toAddress,
                    travelMode: google.maps.TravelMode.DRIVING,
                    provideRouteAlternatives: true,
                };

                directionsService.route(request, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        setRoutes(result.routes);
                        directionsRenderer.setDirections(result);
                    } else {
                        console.error("Directions request failed due to ", status);
                    }
                });
            }
        });
    }, [fromAddress, toAddress, API_KEY]);

    const handleSelectRoute = (index: number) => {
        setSelectedRoute(index);
        const directionsRenderer = new window.google.maps.DirectionsRenderer();
        directionsRenderer.setRouteIndex(index); // Візуалізувати обраний маршрут
    };

    return (
        <div>
            <h2>Який у вас маршрут?</h2>
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
            <div ref={mapRef} style={{ height: "400px", width: "100%" }}></div>
        </div>
    );
};

export default RouteSelection;
