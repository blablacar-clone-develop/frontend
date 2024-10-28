import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import '../styles/UserVerification.module.css';
import {fetchUserData} from "../utils/tokenUtils.ts";
import Navbar from "../components/NavbarComponent.tsx";
import styles from '../styles/UserVerification.module.css';


const UserVerification: React.FC = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const {emailVerified, phoneVerified, documentVerified, tripId} = location.state || {};

    useEffect(() => {
        console.log(emailVerified);
        console.log(phoneVerified);
        console.log(documentVerified);
        console.log(tripId);
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
    const handleViewTrip = () => {
        navigate('/tripDetails', { state: { tripId } });
    };
    // function handleShowTrip() {
    //
    //     console.log(location.state.fromAddress);
    //     console.log(location.state.toAddress);
    // }

    return (
        <main className="main">
            <Navbar/>
            <main className={styles.main14}>
                <div className={styles.container14}>
                    <h1 className={styles.title14}>Your Trip Has Been Published!</h1>
                    <h3 className={styles.subtitle14}>Verify Your Profile</h3>
                    <p className={styles.description14}>
                        For security and trust on our platform. This will help other users feel confident in your
                        reliability.
                    </p>

                    <div className={styles.verificationOptions14}>
                        <button
                            className={styles.button14}
                            onClick={handleVerifyIdentity}
                            disabled={documentVerified} // Disable if documentVerified is true
                        >
                            Verify Your Identity
                        </button>
                        <button
                            className={styles.button14}
                            onClick={handleVerifyEmail}
                            disabled={emailVerified} // Disable if emailVerified is true
                        >
                            Verify Your Email
                        </button>
                        <button
                            className={styles.button14}
                            onClick={handleVerifyPhone}
                            disabled={phoneVerified} // Disable if phoneVerified is true
                        >
                            Verify Your Phone Number
                        </button>
                    </div>

                    <a onClick={handleViewTrip} className={styles.link14}>
                        View This Trip
                    </a>
                </div>
            </main>
        </main>
    );
};

export default UserVerification;
