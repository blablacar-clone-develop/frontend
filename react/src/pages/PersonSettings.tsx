import React from 'react';
import '../styles/PersonSettings.css';
import NavBar from '../components/NavbarComponent.tsx';
import { Nav } from 'react-bootstrap';
const ProfilePage: React.FC = () => {
    const username = localStorage.getItem('username') || 'Vladimir';

    return (
        <main className="main">
            <NavBar/>
            <div className="profile-page">

                <div className="profile-header">
                    <i className="bi bi-person-circle profile-icon"></i>
                    <div className="profile-info">
                        <span className="username">{username}</span>
                        <i className="bi bi-car"></i>
                    </div>
                   <Nav.Link href="/profile"> <i className="bi bi-chevron-right"></i></Nav.Link>
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
                    <div className="car-info">
                        <div className="car-details">
                            <span>VOLKSWAGEN PASSAT</span>
                            <span>Black</span>
                        </div>
                        <i className="bi bi-chevron-right"></i>
                    </div>
                    <p className="add-transport">Add transport <i className="bi bi-box-arrow-up-right"></i></p>
                </div>
                <div className="exit">
                    <span>Exit</span>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
