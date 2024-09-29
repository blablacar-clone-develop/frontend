import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Profile.css';
import NavBar from '../components/NavbarComponent';
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {fetchUserData} from "../utils/tokenUtils.ts";


const PersonalInfo: React.FC = () => {
    const API_URL = import.meta.env.VITE_BASE_URL_API || "KeyNOTfound";
    const [originalData, setOriginalData] = useState({
        name: '',
        surname: '',
        birthdate: '',
        email: '',
        phoneNumber: '',
        description: ''
    });

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneValid] = useState(true);
    const [description, setDescription] = useState('');
    const [hasChanges, setHasChanges] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchData = async () => {

            await fetchUserData(navigate);

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
                const fetchPersonalInfo = async () => {
                    try {
                        const response = await axios.get(`${API_URL}/api/usersData/${userId}`);
                        const data = response.data;

                        setOriginalData({
                            name: data.name,
                            surname: data.surname,
                            birthdate: data.dateOfBirthday,
                            email: data.email,
                            phoneNumber: data.phoneNumber,
                            description: data.description
                        });

                        setName(data.name);
                        setSurname(data.surname);
                        setBirthdate(data.dateOfBirthday);
                        setEmail(data.email);
                        setPhoneNumber(data.phoneNumber);
                        setDescription(data.description);
                    } catch (error) {
                        console.error('Error fetching personal info:', error);
                    }
                };

                if (userId) {
                    fetchPersonalInfo();
                }
            }
        }
        fetchData();
    }, [userId]);

    useEffect(() => {

        const hasChanges = (
            name !== originalData.name ||
            surname !== originalData.surname ||
            birthdate !== originalData.birthdate ||
            email !== originalData.email ||
            phoneNumber !== originalData.phoneNumber ||
            description !== originalData.description
        );

        setHasChanges(hasChanges);
    }, [name, surname, birthdate, email, phoneNumber, description, originalData]);

    const handleSave = async () => {
        if (!phoneValid) {
            alert('Phone number is not valid!');
            return;
        }

        try {
            await axios.put(`http://localhost:8080/api/usersData/update/${userId}`, {
                name,
                surname,
                dateOfBirthday: birthdate,
                email,
                phoneNumber,
                description
            });

            setOriginalData({ name, surname, birthdate, email, phoneNumber, description });
            localStorage.removeItem("username");
            localStorage.setItem("username", originalData.name);
            setHasChanges(false);
        } catch (error) {
            console.error('Error saving personal info:', error);
        }
    };

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
                        <PhoneInput
                            country={'ua'}
                            value={phoneNumber}
                            onChange={(phone) => setPhoneNumber(phone)}
                            inputClass="phoneInputClass"
                        />
                        {!phoneValid && <p className="error">Invalid phone number for selected country!</p>}
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="description">Brief description</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="inputField"
                        />
                    </div>
                </div>

                {hasChanges && (
                    <button className="saveButton" onClick={handleSave}>
                        Save Changes
                    </button>
                )}
            </div>
        </main>
    );
};

export default PersonalInfo;
