import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarComponent.tsx";
import Footer from "../components/main/Footer/Footer.tsx";

import "../styles/ConfirmIdentity.css";
import {fetchUserData} from "../utils/tokenUtils.ts";

const ConfirmIdentity: React.FC = () => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_BASE_URL_API || "KeyNOTfound";

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData(navigate); // Використовуємо утиліту для перевірки токену
        };
        fetchData();
    }, [API_URL, navigate]);

    function handleIdPass() {
        navigate("/confirmDocument", {state: {uploadDoc: "idPass"}});
    }

    function handleForeign() {
        navigate("/confirmDocument", {state: {uploadDoc:"foreignPass"}});
    }

    function handleDrivLicense() {
        navigate("/confirmDocument", {state: {uploadDoc:"drivingLicense"}});
    }

    return (
        <main className="main3">
            <Navbar />
            <div className="identity-confirm-container">
                <h2>How do you want to confirm your identity?</h2>
                <div className="identity-options" >
                    <div className="option-card" onClick={handleIdPass}>
                        <div className="icon id-passport"></div>
                        <p><strong>ID passport</strong><br />Front and back side</p>
                    </div>
                    <div className="option-card" onClick={handleForeign}>
                        <div className="icon foreign-passport"></div>
                        <p><strong>Foreign passport</strong><br />Front side</p>
                    </div>
                    <div className="option-card" onClick={handleDrivLicense}>
                        <div className="icon drivers-license"></div>
                        <p><strong>Driver's license</strong><br />Front and back side</p>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default ConfirmIdentity;
