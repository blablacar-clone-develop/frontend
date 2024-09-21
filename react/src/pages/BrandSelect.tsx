import React, { useEffect, useState } from 'react';
import '../styles/CreationTransport.css';
import Navbar from "../components/NavbarComponent";
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";

const CarBrandSelection: React.FC = () => {
    const API_URL = import.meta.env.VITE_BASE_URL_API || "KeyNOTfound";
    const { carId } = useParams<{ carId: string }>();
    const [searchTerm, setSearchTerm] = useState('');
    const [carBrands, setCarBrands] = useState<string[]>([]);
    const [topBrands, setTopBrands] = useState<string[]>([]);
    const [displayBrands, setDisplayBrands] = useState<string[]>([]);
    const [filteredBrands, setFilteredBrands] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if(token) {
                try {
                    const response = await axios.get(`${API_URL}/api/user`, {
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
                    console.error('Error fetching user data:', error);
                }

                const fetchBrands = async () => {
                    try {
                        const allBrandsResponse = await axios.get(`${API_URL}/api/autos/brands/all`);
                        const topBrandsResponse = await axios.get(`${API_URL}/api/autos/brands/top`);

                        const allBrands = allBrandsResponse.data;
                        const topBrands = topBrandsResponse.data;

                        setCarBrands(allBrands);
                        setTopBrands(topBrands);
                        updateDisplayBrands(allBrands, topBrands);
                    } catch (error) {
                        console.error('Error fetching brands:', error);
                    }
                };
                fetchBrands();
            }

        }
        fetchUserData();
    }, [carId]);

    const updateDisplayBrands = (allBrands: string[], topBrands: string[]) => {
        if (topBrands.length > 0) {
            setDisplayBrands(topBrands);
        } else {
            setDisplayBrands(allBrands.slice(0, 5));
        }
    };

    useEffect(() => {
        if (searchTerm) {
            const filtered = carBrands.filter(brand =>
                brand.toLowerCase().includes(searchTerm.toLowerCase())
            ).slice(0, 10);
            setFilteredBrands(filtered);
        } else {
            setFilteredBrands(displayBrands);
        }
    }, [searchTerm, displayBrands]);


    const handleBrandSelect = (brand: string) => {
        if(carId) {
            navigate('/modelSelect', { state: { brand, carId } });
        } else
            navigate('/modelSelect', { state: { brand } });
    };

    return (
        <main className='main'>
            <Navbar />
            <div className="car-brand-selection">
                <h1 className="title">Яка марка вашого авто?</h1>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                    placeholder="Введіть марку авто"
                />
                <ul className="brand-list">
                    {filteredBrands.map((brand, index) => (
                        <li key={index} className="modelItem" onClick={() => handleBrandSelect(brand)}>
                            {brand}
                            <i className="bi bi-chevron-right"></i>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default CarBrandSelection;
