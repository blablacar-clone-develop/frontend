import React, { useEffect, useState } from 'react';
import "../styles/CreationTransport.css";

import Navbar from '../components/NavbarComponent';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

interface CarColor {
    id: number;
    name: string;
    hex: string;
}
interface LocationState {
    brand: string;
    model: string;
}
const CarColorSelection: React.FC = () => {
    const API_URL = import.meta.env.VITE_BASE_URL_API || "KeyNOTfound";
    const [searchTerm, setSearchTerm] = useState('');
    const [carColors, setCarColors] = useState<CarColor[]>([]);
    const location = useLocation<LocationState>();
    const { brand, model, carId } = location.state || {};

    const filteredColors = carColors.filter(color =>
        color.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
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
                const fetchAllColors = async () => {
                    try {
                        const response = await axios.get<CarColor[]>(`${API_URL}/api/autos/colors/all`);
                        setCarColors(response.data);
                    } catch (error) {
                        console.error('Error fetching colors:', error);
                    }
                }
                fetchAllColors();
            }
        }
        fetchUserData();
    }, []);

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
                <h1 className="title">Якого кольору ваше авто?</h1>
                <ul className="colorList">
                    {filteredColors.map((color, index) => (
                        <li key={index} className="colorItem" onClick={() => handleColorSelect(color.id)}>
                            <span
                                className="colorCircle"
                                style={{ backgroundColor: color.hex }}
                            ></span>
                            {color.name}
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default CarColorSelection;
