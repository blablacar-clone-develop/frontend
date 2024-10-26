import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader";
import "../styles/RouteSelection.css";
import { fetchUserData } from "../utils/tokenUtils.ts";
import NavbarComponent from "../components/NavbarComponent.tsx";

const RouteSelection: React.FC = () => {
    const location = useLocation();
    const { fromAddress, toAddress } = location.state || {};
    const navigate = useNavigate();

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

                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
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
    const convertDurationToEnglish = (duration: string) => {
        const hoursMatch = duration.match(/(\d+)\s*год/);
        const minutesMatch = duration.match(/(\d+)\s*хв/);

        const hours = hoursMatch ? hoursMatch[1] : '0';
        const minutes = minutesMatch ? minutesMatch[1] : '0';

        return `${hours} hour${hours !== '1' ? 's' : ''} ${minutes} minute${minutes !== '1' ? 's' : ''}`;
    };

    const convertDistanceToEnglish = (distance: string) => {
        const kmMatch = distance.match(/(\d[\d\s]*)\s*км/); 
        if (kmMatch) {

            const distanceInNumbers = kmMatch[1].replace(/\s/g, '');
            return `${distanceInNumbers} km`;
        }
        return distance;
    };
    const handleSubmit = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const roadTypes = extractRoadTypes(routes[selectedRoute].legs[0].steps);
        if (selectedRoute !== null) {
            const routeInfo = {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                duration: convertDurationToEnglish(routes[selectedRoute].legs[0].duration.text),
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                distance: convertDistanceToEnglish(routes[selectedRoute].legs[0].distance.text),
                roadTypes: roadTypes

            };
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

    const extractRoadTypes = (steps: google.maps.DirectionsStep[]) => {
        const roadTypes: string[] = [];
        steps.forEach(step => {

            const matches = step.instructions.match(/([A-Z]+\d+)+/g);
            if (matches) {
                matches.forEach(type => {
                    if (!roadTypes.includes(type)) {
                        roadTypes.push(type);
                    }
                });
            }
        });
        return roadTypes;
    };

    return (
        <main className="main">
            <NavbarComponent/>
            <div className="container5">
                <div className="left-container">
                    <h2 className="quest2">What is your route?</h2>
                    <div className="divRoutes">
                        {routes.map((route, index) => {
                            const roadTypes = extractRoadTypes(route.legs[0].steps);
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            const durationInEnglish = convertDurationToEnglish(route.legs[0].duration.text);
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            const distanceInEnglish = convertDistanceToEnglish(route.legs[0].distance.text);
                            return (
                                <div key={index}
                                     className={`route ${selectedRoute === index ? 'selected' : ''}`}
                                     onClick={() => handleSelectRoute(index)}
                                     style={{
                                         backgroundColor: selectedRoute === index ? '#4389E4' : '#F9FBFF',
                                         color: selectedRoute === index ? '#F9FBFF' : '#3F3F3F'
                                     }}>

                                    <label htmlFor={`route-${index}`} className="LabelDur">
                                        {durationInEnglish}
                                    </label>
                                    <label htmlFor={`route-${index}`}>
                                        {distanceInEnglish} - {roadTypes.join(', ')}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                    <button className="continue-button7" onClick={handleSubmit}>
                        Continue
                    </button>
                </div>
                <div className="map-container">
                    <div ref={mapRef} className="map"/>
                </div>
            </div>
            </main>
            );
            };

            export default RouteSelection;
