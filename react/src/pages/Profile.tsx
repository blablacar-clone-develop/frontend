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
        description: '',
        avatar: ''
    });

    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [birthdate, setBirthdate] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [hasChanges, setHasChanges] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [phoneValid] = useState(true);


    useEffect(() => {
        document.title = 'Profile';
    }, []);

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
                            description: data.description,
                            avatar: data.avatar?.url || '' // Отримання аватарки
                        });

                        setName(data.name);
                        setSurname(data.surname);
                        setBirthdate(data.dateOfBirthday);
                        setEmail(data.email);
                        setPhoneNumber(data.phoneNumber);
                        setDescription(data.description);
                        setAvatar(data.avatar?.url || '');
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
            description !== originalData.description ||
            avatarFile !== null // Додана перевірка на зміни файлу аватарки
        );
        setHasChanges(hasChanges);
    }, [name, surname, birthdate, email, phoneNumber, description, avatarFile, originalData]);

    const handleSave = async () => {
        if (!phoneValid) {
            alert('Phone number is not valid!');
            return;
        }

        try {
            if (avatarFile) {
                const formData = new FormData();
                formData.append("avatar", avatarFile); // Додавання файлу до FormData
                const token = localStorage.getItem("token");
                await axios.post(`${API_URL}/api/files/upload/avatar`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
            }

            await axios.put(`${API_URL}/api/usersData/update/${userId}`, {
                name,
                surname,
                dateOfBirthday: birthdate,
                email,
                phoneNumber,
                description
            });

            setOriginalData({ name, surname, birthdate, email, phoneNumber, description, avatar });
            localStorage.removeItem("username");
            localStorage.setItem("username", originalData.name);
            setHasChanges(false);
        } catch (error) {
            console.error('Error saving personal info:', error);
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatarFile(e.target.files[0]);
            const avatarUrl = URL.createObjectURL(e.target.files[0]); // Створення тимчасового URL для попереднього перегляду
            setAvatar(avatarUrl);
        }
    };

    return (
        <main className='main'>
            <NavBar />
            <div className="personalInfoContainer">
                <h1 className="title">Personal information</h1>

                <div className="personalInfoGrid">
                    <div className="photoSection">
                        {avatar ? (
                            <img src={avatar} alt="Profile Avatar" className="profileAvatar" />
                        ) : (
                            <i className="bi bi-person-circle photoIcon"></i>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            id="avatar"
                            onChange={handleAvatarChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="avatar" className="changePhotoBtn">Change photo</label>
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name || ''} // Переконатися, що значення не undefined
                            onChange={(e) => setName(e.target.value)}
                            className="inputField"
                        />
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="surname">Surname</label>
                        <input
                            type="text"
                            id="surname"
                            value={surname || ''} // Переконатися, що значення не undefined
                            onChange={(e) => setSurname(e.target.value)}
                            className="inputField"
                        />
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="birthdate">Date of birth</label>
                        <input
                            type="text"
                            id="birthdate"
                            value={birthdate || ''} // Переконатися, що значення не undefined
                            onChange={(e) => setBirthdate(e.target.value)}
                            className="inputField"
                        />
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email || ''} // Переконатися, що значення не undefined
                            onChange={(e) => setEmail(e.target.value)}
                            className="inputField"
                        />
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="phoneNumber">Phone number</label>
                        <PhoneInput
                            country={'ua'}
                            value={phoneNumber || ''} // Переконатися, що значення не undefined
                            onChange={(phone) => setPhoneNumber(phone)}
                            inputClass="phoneInputClass"
                        />
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="description">Brief description</label>
                        <input
                            type="text"
                            id="description"
                            value={description || ''} // Переконатися, що значення не undefined
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
