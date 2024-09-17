import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/NavbarComponent.tsx";
import axios from 'axios';

const CarModelSelection: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [carModels, setCarModels] = useState<string[]>([]);
    const [displayModels, setDisplayModels] = useState<string[]>([]); // Моделі для відображення
    const { brand } = location.state || { brand: '' };

    useEffect(() => {
        if (!brand) {
            navigate('/brandSelect');
            return;
        }
        const fetchCarModels = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/autos/models/all/${brand}`);
                setCarModels(response.data);
                setDisplayModels(response.data.slice(0, 10));
            } catch (error) {
                console.error('Error fetching car models:', error);
            }
        };

        fetchCarModels();
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
