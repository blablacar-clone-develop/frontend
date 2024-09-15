import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/NavbarComponent.tsx";

const CarModelSelection: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const { brand } = location.state || { brand: '' };

    const carModels = {
        'KIA': ['RIO', 'SPORTAGE', 'CEE\'D', 'CEED', 'CERATO'],
        'VOLKSWAGEN': ['PASSAT', 'GOLF', 'JETTA'],
        'RENAULT': ['LOGAN', 'DUSTER', 'MEGANE'],
    };
    console.log(brand);
    if (!brand || !carModels[brand]) {
        navigate('/brandSelect');
        return null;
    }

    const filteredModels = carModels[brand].filter(model =>
        model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleModelSelect = (model: string) => {
        navigate('/colorSelect', { state: { brand, model } });
    };

    return (
        <main className='main'>
            <Navbar/>
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
                    {filteredModels.map((model, index) => (
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
