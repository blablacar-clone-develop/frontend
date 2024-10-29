import React from "react";
import {Container} from "react-bootstrap";
import '../styles/ComingSon.css';

const ComingSonComponent: React.FC = () => {

    return (
        <Container fluid className="d-flex align-items-center justify-content-center">
            <div className="coming-soon-container">
                <div className="coming-soon-content">
                    <div className="coming-soon-badge">COMING SOON</div>
                    <h3 className="coming-soon-title">Pay online</h3>
                    <p className="coming-soon-description">
                        We are working on integrating a secure payment system for your convenience. Soon, you will be able to pay for your trips directly on our website using a bank card. Your financial data will be reliably protected by modern security protocols such as data encryption and fraud protection.
                        How it works:
                        Choose your trips - just like before, you will be able to find and book a seat on the trip you want.
                        Pay securely - we'll offer a simple and fast card payment option when you book.
                        Receive confirmation instantly - after successful payment, you will receive a confirmation of your trip booking via email.
                    </p>
                    <div className="payment-logos">
                        <div className="payment-logo logo-visa"/>
                        <div className="payment-logo logo-mcard"/>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ComingSonComponent;
