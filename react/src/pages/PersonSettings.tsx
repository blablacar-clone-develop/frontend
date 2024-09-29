import React, { useState, useEffect } from 'react';
import '../styles/PersonSettings.css';
import NavBar from '../components/NavbarComponent';
import { Nav } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import {fetchUserData} from "../utils/tokenUtils.ts";

interface Autos {
    id: number;
    brand: Brand;
    model: Model;
    color: Color;
}
interface Model {
    id: number;
    name: string;
    brand: Brand;
}
interface Brand {
    id: number;
    name: string;
}
interface Color {
    id: number;
    name: string;
    hex: string;
}


const ProfilePage: React.FC = () => {
    const username = localStorage.getItem('username');
    const [cars, setCars] = useState<Autos[]>([]);
    const navigate = useNavigate();

    ///Зміна заголовку сторінки
    useEffect(() => {
        document.title = 'Person Settings';
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await fetchUserData(navigate); // Використовуємо утиліту для перевірки токену
            if (userData.autos) {
                setCars(userData.autos);
            }
        }
        fetchData();
    }, [navigate]);

    const handleCarClick = (carId: number) => {
        navigate(`/cars/${carId}/edit`);
    };

    const handleConfirmIdentity = () => {
        navigate("/confirmIdentity");
    };
    const handleConfirmEmail = () => {
        navigate("/confirmEmail");
    };


    return (
        <main className="main">
            <NavBar />
            <div className="profile-page">

                <div className="profile-header">
                    <i className="bi bi-person-circle profile-icon"></i>
                    <div className="profile-info">
                        <span className="username">{username}</span>
                        <i className="bi bi-car"></i>
                    </div>
                    <Nav.Link href="/profile">
                        <i className="bi bi-chevron-right"></i>
                    </Nav.Link>
                </div>

                <div className="profile-section">
                    <h3>Confirm your profile</h3>
                    <ul>
                        <li onClick={handleConfirmIdentity}>Confirm your identity <i className="bi bi-box-arrow-up-right"></i></li>
                        <li onClick={handleConfirmEmail}>Confirm your email address <i className="bi bi-box-arrow-up-right"></i></li>
                        <li>Confirm phone number <i className="bi bi-box-arrow-up-right"></i></li>
                    </ul>
                </div>

                <div className="profile-section">
                    <h3>Payment</h3>
                    <ul>
                        <li>Payment methods <i className="bi bi-box-arrow-up-right"></i></li>
                        <li>Payments and reimbursements <i className="bi bi-box-arrow-up-right"></i></li>
                    </ul>
                </div>

                <div className="profile-section">
                    <h3>About me</h3>
                    <ul>
                        <li>Add information <i className="bi bi-box-arrow-up-right"></i></li>
                        <li>Change settings <i className="bi bi-box-arrow-up-right"></i></li>
                    </ul>

                </div>
                <div className="profile-section">

                    <h3>Transport</h3>
                    {cars.length > 0 ? (
                        cars.map((car) => (
                            <div className="car-info" key={car.id} onClick={() => handleCarClick(car.id)}>
                                <div className="car-details">
                                    <span>{car.brand.name.toUpperCase()} {car.model.name.toUpperCase()}</span>
                                    <span>{car.color.name}</span>
                                </div>
                                <i className="bi bi-chevron-right"></i>
                            </div>
                        ))
                    ) : (
                        <p>No cars available</p>
                    )}

                    <Nav.Link href='/brandSelect'><p className="add-transport">Add transport <i
                        className="bi bi-box-arrow-up-right"></i></p></Nav.Link>
                </div>

                <div className="exit">
                    <span>Exit</span>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
