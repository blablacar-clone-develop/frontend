import React, { useEffect, useState } from 'react';
import "../styles/CreationTransport.css";

import Navbar from '../components/NavbarComponent';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchUserData} from "../utils/tokenUtils.ts";

interface CarColor {
    id: number;
    name: string;
    hex: string;
}

const CarColorSelection: React.FC = () => {
    const API_URL = import.meta.env.VITE_BASE_URL_API || "KeyNOTfound";
    const [searchTerm] = useState('');
    const [carColors, setCarColors] = useState<CarColor[]>([]);
    const location = useLocation();
    const { brand, model, carId } = location.state || {};

    const filteredColors = carColors.filter(color =>
        color.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const userData = await fetchUserData(navigate); // Використовуємо утиліту для перевірки токену
            if (userData) {
                fetchAllColors();
            }
        }
        const fetchAllColors = async () => {
            try {
                const response = await axios.get<CarColor[]>(`${API_URL}/api/autos/colors/all`);
                setCarColors(response.data);
            } catch (error) {
                console.error('Error fetching colors:', error);
            }
        }
        fetchData();
    }, [navigate]);

    async function handleColorSelect(id: number) {
        try {

            if(carId) {
                ///Оновити існуюче авто

                // console.log("CARid: " +carId);
                // console.log("brand\n: " +brand);
                // console.log("\nmodel\n: " +model);
                // console.log("colorId\n: " + id);

                const response = await axios.put(`${API_URL}/api/autos/update/${carId}`, {
                    id,
                    brand,
                    model
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const createdAuto = response.data;
                if(createdAuto)
                    navigate('/personSettings');
            } else {
                ///Створити нове авто
                const response = await axios.put(`${API_URL}/api/autos/create`, {
                    id,
                    brand,
                    model
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const createdAuto = response.data;
                if(createdAuto)
                    navigate('/personSettings');
            }


        } catch (error) {
            console.error('Error saving car:', error);
        }
    }

    return (
        <main className='main'>
            <Navbar/>
            <div className="carColorSelection">
                <h1 className="title-createTransport">What color is your vehicle?</h1>
                <ul className="colorList">
                    {filteredColors.map((color, index) => (
                        <li key={index} className="colorItem" onClick={() => handleColorSelect(color.id)}>
                            <span
                                className="colorCircle"
                                style={{ backgroundColor: color.hex }}
                            ></span>
                            {color.name}
                            <span className="colorIndicator"></span>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default CarColorSelection;
