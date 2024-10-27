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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vestibulum elementum facilisis tortor vitae dictum. Integer dapibus vitae magna vel auctor.
                        Fusce at velit mi.
                        Proin eget enim viverra, tempus magna vitae, ber sollicitudin orci. Orci varius natoque
                        penatibus et...
                    </p>
                    <div className="payment-logos">
                        <img src="src/assets/visa.svg" alt="Visa" className="payment-logo"/>
                        <img src="src/assets/mastercard.svg" alt="MasterCard" className="payment-logo"/>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ComingSonComponent;
