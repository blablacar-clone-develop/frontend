import { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Navbar from '../components/NavbarComponent';
import Footer from '../components/main/Footer/Footer';
import "../styles/ConfirmDocument.css";
import axios from "axios";
const ConfirmDocument: React.FC = () => {
    const location = useLocation();
    const [uploadDoc, setUploadDoc] = useState('idPass');
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_BASE_URL_API || "KeyNOTfound";
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

            }
        }
        fetchUserData();
        const state = location.state as { uploadDoc: string };
        if (state?.uploadDoc ) {
            setUploadDoc(state.uploadDoc);
        }
    }, [location]);
    const uploadText = uploadDoc === "idPass" || uploadDoc==="drivingLicense" ? 'Front and back side' : 'Front side';
    return (
        <main className="main4">
            <Navbar/>
            <div className="upload-container">
                <div className="upload-card">
                    <h3>{uploadText}</h3>
                    <p>Take a picture or upload a photo</p>
                    <div className="upload-btn">
                        <button>+</button>
                        <span>Download the file</span>
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    );
};

export default ConfirmDocument;
