import { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Navbar from '../components/NavbarComponent';
import Footer from '../components/main/Footer/Footer';
import "../styles/ConfirmDocument.css";
import {fetchUserData} from "../utils/tokenUtils.ts";
const ConfirmDocument: React.FC = () => {
    const location = useLocation();
    const [uploadDoc, setUploadDoc] = useState('idPass');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const userData = await fetchUserData(navigate); // Використовуємо утиліту для перевірки токену
            if (userData) {
                const state = location.state as { uploadDoc: string };
                if (state?.uploadDoc ) {
                    setUploadDoc(state.uploadDoc);
                }
            }
        }
        fetchData();
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
