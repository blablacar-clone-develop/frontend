import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarComponent.tsx";
import Footer from "../components/main/Footer/Footer.tsx";

import "../styles/ConfirmIdentity.css";

const ConfirmIdentity: React.FC = () => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_BASE_URL_API || "KeyNOTfound";

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get(`${API_URL}/api/user`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.data === "token") {
                        localStorage.removeItem("token");
                        localStorage.removeItem("username");
                        localStorage.removeItem("userId");
                        navigate("/login");
                    }
                } catch (error) {
                    console.error("Помилка під час отримання даних користувача:", error);
                }
            }
        };

        fetchUserData();
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
