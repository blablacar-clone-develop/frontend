import React from "react";
import  "../styles/PayCard.css";
import Navbar from "../components/NavbarComponent.tsx";
import Footer from "../components/main/Footer/Footer.tsx";
import {useNavigate} from "react-router-dom";


const PayCard: React.FC = ()=>
{
    const navigate = useNavigate();

    const handlePaymentClick = () => {
        navigate("/comingson"); // Перенаправляє на адресу /comingson
    };


    return(
        <main className="main">
        <Navbar/>
            <main className="pay-card-main">

                <h2 className="pay-card-title">Online Payment</h2>
                <div className="pay-card-container">

                    <form className="pay-card-form">
                        <div className="pay-card-logo">
                            <img className="imgVisa"/>
                        </div>
                        <input className="pay-card-input" type="text" placeholder="Bank card number"/>
                        <div className="pay-card-input-row">
                            <input className="pay-card-input-short" type="text" placeholder="MM/PP"/>
                            <input className="pay-card-input-short" type="text" placeholder="CVV2"/>
                        </div>
                        <input className="pay-card-input" type="text" placeholder="Surname, name"/>

                    </form>

                </div>
                <button className="pay-card-button" type="submit" onClick={handlePaymentClick}>Pay "Coming son" <span>{localStorage.getItem("endPrice")} ₴</span></button>

            </main>
            <Footer/>
        </main>
    );
}
export default PayCard;