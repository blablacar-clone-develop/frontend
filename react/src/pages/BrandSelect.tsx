import React, { useState } from 'react';
import '../styles/CreationTransport.css';
import Navbar from "../components/NavbarComponent.tsx";
import { useNavigate } from 'react-router-dom';

const CarBrandSelection: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Для навігації між сторінками
    const carBrands = ['KIA', 'VOLKSWAGEN', 'RENAULT', 'ВАЗ', 'OPEL', 'DAEWOO'];
    const filteredBrands = carBrands.filter(brand =>
        brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleBrandSelect = (brand: string) => {
        navigate('/modelSelect', { state: { brand } });
    };

    return (
        <main className='main'>
            <Navbar/>
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
                        <li key={index} className="brand-item" onClick={() => handleBrandSelect(brand)}>
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
