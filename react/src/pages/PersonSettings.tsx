import React, { useState, useEffect } from 'react';
import '../styles/PersonSettings.css';
import NavBar from '../components/NavbarComponent.tsx';
import { Nav } from 'react-bootstrap';

interface Car {
    id: number;
    model: string;
    color: string;
}

const ProfilePage: React.FC = () => {
    const username = localStorage.getItem('username') || 'Vladimir';
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        const fetchUserCars = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await fetch(`http//localhost:8080/api/users/${userId}/cars`);
                if (response.ok) {
                    const data = await response.json();
                    setCars(data);
                } else {
                    console.error('Failed to fetch cars');
                }
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };

        fetchUserCars();
    }, []);

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
                        <li>Confirm your identity <i className="bi bi-box-arrow-up-right"></i></li>
                        <li>Confirm your email address <i className="bi bi-box-arrow-up-right"></i></li>
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
                            <div className="car-info" key={car.id}>
                                <div className="car-details">
                                    <span>{car.model.toUpperCase()}</span>
                                    <span>{car.color}</span>
                                </div>
                                <i className="bi bi-chevron-right"></i>
                            </div>
                        ))
                    ) : (
                        <p>No cars available</p>
                    )}

                    <Nav.Link href='/brandSelect'> <p className="add-transport" >Add transport <i className="bi bi-box-arrow-up-right"></i></p></Nav.Link>
                </div>

                <div className="exit">
                    <span>Exit</span>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
