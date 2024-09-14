import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';
import NavBar from '../components/NavbarComponent.tsx';

const PersonalInfo: React.FC = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchPersonalInfo = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/usersData/${userId}');
                if (response.ok) {
                    const data = await response.json();
                    setName(data.name);
                    setSurname(data.surname);
                    setBirthdate(data.birthdate);
                    setEmail(data.email);
                    setPhoneNumber(data.phoneNumber);
                    setDescription(data.description);
                } else {
                    console.error('Failed to fetch personal info');
                }
            } catch (error) {
                console.error('Error fetching personal info:', error);
            }
        };

        fetchPersonalInfo();
    }, [userId]);

    return (
        <main className='main'>
            <NavBar />
            <div className="personalInfoContainer">
                <h1 className="title">Personal information</h1>

                <div className="personalInfoGrid">
                    <div className="photoSection">
                        <i className="bi bi-person-circle photoIcon"></i>
                        <button className="changePhotoBtn">Change photo</button>
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="inputField"
                        />
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="surname">Surname</label>
                        <input
                            type="text"
                            id="surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            className="inputField"
                        />
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="birthdate">Date of birth</label>
                        <input
                            type="text"
                            id="birthdate"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            className="inputField"
                        />
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="inputField"
                        />
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="phoneNumber">Phone number</label>
                        <div className="inputPlaceholder">
                            <span>+</span>
                            <input
                                type="text"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="inputFieldPlaceholder"
                            />
                        </div>
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="description">Brief description</label>
                        <div className="inputPlaceholder">
                            <span>+</span>
                            <input
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="inputFieldPlaceholder"
                            />
                        </div>
                    </div>


                </div>
            </div>
        </main>
    );
};

export default PersonalInfo;
