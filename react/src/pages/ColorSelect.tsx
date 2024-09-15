import React, { useState } from 'react';
import "../styles/CreationTransport.css";
import Navbar from '../components/NavbarComponent.tsx';
const CarColorSelection: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const carColors = ['Чорний', 'Білий', 'Темно-сірий', 'Сірий', 'Вишневий', 'Червоний', 'Темно-синій', 'Синій', 'Темно-зелений', 'Зелений'];

    const filteredColors = carColors.filter(color =>
        color.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className='main'>
        <Navbar/>
            <div className="carColorSelection">
                <h1 className="title">Якого кольору ваше авто?</h1>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="searchInput"
                    placeholder="Введіть колір авто"
                />
                <ul className="colorList">
                    {filteredColors.map((color, index) => (
                        <li key={index} className="colorItem">
                            <span className={`colorCircle color-${color.toLowerCase()}`}></span>
                            {color}
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default CarColorSelection;
