// src/components/CardsSection.tsx
import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/homePage.css';


const CardsSection: React.FC = () => {
    return (
        <Container fluid className="myContLine position-relative">
            <div className="d-flex justify-content-between align-items-center cards">
                <div className="card-item position-relative card1">
                    <h5 className="headerOfCards">Choose trips at a low price</h5>
                    <p>Wherever you're going, whether by bus or with fellow travelers, find the perfect ride from a variety of destinations
                        and routes - and travel at low prices.</p>
                </div>
                <div className="card-item position-relative card2">
                    <h5 className="headerOfCards" >Trust your fellow travelers</h5>
                    <p>We know all our passengers and bus partners well. We check reviews and
                        profiles so you can travel with confidence.</p>
                </div>
                <div className="card-item position-relative card3">
                    <h5 className="headerOfCards">ПScroll, click, click and book!</h5>
                    <p>Booking a trip has never been so easy! Thanks to a powerful algorithm, our application will find a driver near you in just a few minutes.</p></div>
            </div>

        </Container>
    );
};

export default CardsSection;
