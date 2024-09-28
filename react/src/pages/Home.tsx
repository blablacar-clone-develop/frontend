import React, {useEffect} from 'react';
import NavbarComponent from '../components/NavbarComponent';
import MainContent from '../components/MainContent';
import SearchPanel from '../components/SearchPanel';
import BusImage from '../components/MainImage';
import CardsSection from '../components/CardsSection';
import Footer from '../components/main/Footer/Footer';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const HomePage: React.FC = () => {
    const API_URL = import.meta.env.VITE_BASE_URL_API || "KeyNOTfound";
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
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
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('userId');

            }
        };

        checkToken();
    }, [token, navigate]);
    return (
        <main className="main">
            <NavbarComponent />
            <MainContent />
            <SearchPanel />
            <BusImage/>
            <CardsSection />
            <Footer/>
        </main>
    );
};

export default HomePage;
