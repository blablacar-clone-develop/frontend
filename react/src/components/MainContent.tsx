// src/components/MainContent.tsx
import React from 'react';
import {Container} from "react-bootstrap";
import '../styles/homePage.css';

const MainContent: React.FC = () => {
    return (
        <Container fluid className="text-center middlePanel">
            <h1 className="display-3 text-start firstHeader">Moving together <br/> achieving more</h1>
            <p className="lead text-start subheader">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.</p>
        </Container>
    );
};

export default MainContent;
