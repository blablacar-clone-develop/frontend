import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/NavbarComponent.tsx";
import axios from 'axios';

const CarModelSelection: React.FC = () => {
    const API_URL = import.meta.env.VITE_BASE_URL_API || "KeyNOTfound";
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [carModels, setCarModels] = useState<string[]>([]);
    const [displayModels, setDisplayModels] = useState<string[]>([]); // Моделі для відображення
    const { brand, carId} = location.state || { brand: '' };


    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get(`${API_URL}/api/user`, {
                        headers: {
                            Authorization: `Bearer ${token}` // Використовуйте token замість this.token
                        }
                    });

                    if (response.data === "token") {
                        localStorage.removeItem('token');
                        localStorage.removeItem('username');
                        localStorage.removeItem('userId');
                        navigate("/login");
                        return;
                    }

                    if (!brand) {
                        navigate('/brandSelect');
                        return;
                    }

                    const fetchCarModels = async () => {
                        try {
                            const carModelsResponse = await axios.get(`${API_URL}/api/autos/models/all/${brand}`);
                            setCarModels(carModelsResponse.data);
                            setDisplayModels(carModelsResponse.data.slice(0, 10));
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

        fetchUserData();
    }, [brand, navigate]);

    useEffect(() => {
        if (searchTerm) {
            const filtered = carModels.filter(model =>
                model.toLowerCase().includes(searchTerm.toLowerCase())
            ).slice(0, 10);
            setDisplayModels(filtered);
        } else {
            setDisplayModels(carModels.slice(0, 10));
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
                <h1 className="title">Яка модель вашого авто {brand}?</h1>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="searchInput"
                    placeholder="Введіть модель авто"
                />
                <ul className="modelList">
                    {displayModels.map((model, index) => (
                        <li key={index} className="modelItem" onClick={() => handleModelSelect(model)}>
                            {model}
                            <i className="bi bi-chevron-right"></i>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default CarModelSelection;
