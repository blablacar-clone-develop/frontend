import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/NavbarComponent";
import axios from 'axios';
import {fetchUserData} from "../utils/tokenUtils.ts";

const CarModelSelection: React.FC = () => {
    const API_URL = import.meta.env.VITE_BASE_URL_API || "KeyNOTfound";
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [carModels, setCarModels] = useState<string[]>([]);
    const [displayModels, setDisplayModels] = useState<string[]>([]); // Моделі для відображення
    const { brand, carId} = location.state || { brand: '' };

    ///Зміна заголовку сторінки
    useEffect(() => {
        document.title = 'Model of your vehicle?';
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await fetchUserData(navigate); // Використовуємо утиліту для перевірки токену
            if (userData) {
                try {
                    if (!brand) {
                        navigate('/brandSelect');
                        return;
                    }
                    const fetchCarModels = async () => {
                        try {
                            const carModelsResponse = await axios.get(`${API_URL}/api/autos/models/all/${brand}`);
                            setCarModels(carModelsResponse.data);
                            setDisplayModels(carModelsResponse.data.slice(0, 5));
                        } catch (error) {
                            console.error('Error fetching car models:', error);
                        }
                    };

                    fetchCarModels();
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchData();
    }, [brand, navigate]);

    useEffect(() => {
        if (searchTerm) {
            const filtered = carModels.filter(model =>
                model.toLowerCase().includes(searchTerm.toLowerCase())
            ).slice(0, 5);
            setDisplayModels(filtered);
        } else {
            setDisplayModels(carModels.slice(0, 5));
        }
    }, [searchTerm, carModels]);

    const handleModelSelect = (model: string) => {
        if(carId) {
            navigate('/colorSelect', { state: { brand, model, carId } });
        } else
            navigate('/colorSelect', { state: { brand, model } });

    };

    return (
        <main className='main'>
            <Navbar />
            <div className="carModelSelection">
                <h1 className="title-createTransport">What’s model of your vehicle {brand}?</h1>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                    placeholder="Enter the car model"
                />
                <ul className="modelList">
                    {displayModels.map((model, index) => (
                        <li key={index} className="modelItem" onClick={() => handleModelSelect(model)}>
                            {model}
                            <i className="bi"></i>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default CarModelSelection;
