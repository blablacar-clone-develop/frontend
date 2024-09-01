// src/components/MainContent.tsx
import React from 'react';
import {Container} from "react-bootstrap";
import '../styles/homePage.css';

const MainContent: React.FC = () => {
    return (
        <Container fluid className="text-center middlePanel">
            <h1 className="display-4 firstHeader">Low price</h1>
            <p className="lead">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.</p>
        </Container>
    );
};

export default MainContent;
