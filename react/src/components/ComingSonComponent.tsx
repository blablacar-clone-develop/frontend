import React from "react";
import {Container} from "react-bootstrap";
import '../styles/ComingSon.css';


const ComingSonComponent: React.FC = () => {

    return (
        <Container fluid className="myContLine vh-100">
            <h2 className="text-center">
                Coming Soon
            </h2>

            <ol className="text-break">
                <li>add payments method</li>
                <li>fix SMS services</li>
                <li>add multi language</li>
            </ol>


        </Container>
    );
};

export default ComingSonComponent;
