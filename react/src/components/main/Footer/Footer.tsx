import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import './footer.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure Bootstrap Icons are installed

const Footer: React.FC = () => {
    return (
        <footer className="myFooter pt-4">
            <Container>
                <Row className="mb-4">
                    {/* Navigation Links */}
                    <Col md={3}>
                        <h5>Компанія</h5>
                        <Nav className="flex-column">
                            <Nav.Link href="#" >Про нас</Nav.Link>
                            <Nav.Link href="#" >Кар’єра</Nav.Link>
                            <Nav.Link href="#" >Медіа</Nav.Link>
                        </Nav>
                    </Col>

                    {/* Product Links */}
                    <Col md={3}>
                        <h5>Послуги</h5>
                        <Nav className="flex-column">
                            <Nav.Link href="#" >Автобуси</Nav.Link>
                            <Nav.Link href="#">Рейси</Nav.Link>
                            <Nav.Link href="#" >Партнери</Nav.Link>
                        </Nav>
                    </Col>

                    {/* Social Media Links */}
                    <Col md={3}>
                        <h5>Слідуйте за нами</h5>
                        <div className="d-flex gap-2">
                            <a href="#" ><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-twitter"></i></a>
                            <a href="#" ><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-linkedin"></i></a>
                        </div>
                    </Col>

                    {/* Legal Links */}
                    <Col md={3}>
                        <h5>Правова інформація</h5>
                        <Nav className="flex-column">
                            <Nav.Link href="#" >Політика конфіденційності</Nav.Link>
                            <Nav.Link href="#" >Умови використання</Nav.Link>
                            <Nav.Link href="#" >Файли cookie</Nav.Link>
                        </Nav>
                    </Col>
                </Row>

                {/* Copyright Information */}
                <Row className="border-top pt-3">
                    <Col className="text-center">
                        <p className="mb-0">© {new Date().getFullYear()} GroundGlide, 2024</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
