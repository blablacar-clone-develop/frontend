import React, {useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import '../styles/UserVerification.css';
import {fetchUserData} from "../utils/tokenUtils.ts";
import Navbar from "../components/NavbarComponent.tsx";


const UserVerification: React.FC = () => {
   const navigate = useNavigate();
    const location = useLocation();
    const {emailVerified, phoneVerified, documentVerified} = location.state || {};

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData(navigate);

        };
        fetchData();
    }, []);

    const handleVerifyIdentity = () => {
       navigate("/confirmIdentity");
    };

    const handleVerifyEmail = () => {
        navigate("/confirmEmail");
    };
    const handleVerifyPhone = () => {
        navigate("/confirmPhone");
    };

    function handleShowTrip() {

        console.log(location.state.fromAddress);
        console.log(location.state.toAddress);
    }

    return (
        <main className="main">
            <Navbar/>
        <div className="container6">
            <div className="heade6">
                <h1>Trip Published</h1>
            </div>
            <div className="content6">
                <h2>Your profile needs verification</h2>
                <div className="verification-item">
                    {!documentVerified ? (
                        <button onClick={handleVerifyIdentity} className="verify-button">
                            <span className="icon">+</span>
                            <span>Verify your identity</span>
                        </button>
                    ) : (
                        <div className="verified">
                            <span className="icon">✓</span>
                            <span>Identity verified</span>
                        </div>
                    )}
                </div>
                <div className="verification-item">
                    {!emailVerified ? (
                        <button onClick={handleVerifyEmail} className="verify-button">
                            <span className="icon">+</span>
                            <span>Verify your email address</span>
                        </button>
                    ) : (
                        <div className="verified">
                            <span className="icon">✓</span>
                            <span>Email verified</span>
                        </div>
                    )}
                </div>
                <div className="verification-item">
                    {phoneVerified ? (
                        <div className="verified">
                            <span className="icon">✓</span>
                            <span>Phone number verified</span>
                        </div>
                    ) : (
                        <button onClick={handleVerifyPhone} className="verify-button">
                            <span className="icon">+</span>
                            <span>Verify your phone number</span>
                        </button>
                    )}
                </div>
            </div>
            <div className="footer">
                <button onClick={handleShowTrip} className="button">View Trip</button>
            </div>
        </div>
        </main>
    );
};

export default UserVerification;
