import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import './footer.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure Bootstrap Icons are installed

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-white pt-4">
            <Container>
                <Row className="mb-4">
                    {/* Navigation Links */}
                    <Col md={3}>
                        <h5>Компанія</h5>
                        <Nav className="flex-column">
                            <Nav.Link href="#" className="text-white">Про нас</Nav.Link>
                            <Nav.Link href="#" className="text-white">Кар’єра</Nav.Link>
                            <Nav.Link href="#" className="text-white">Медіа</Nav.Link>
                        </Nav>
                    </Col>

                    {/* Product Links */}
                    <Col md={3}>
                        <h5>Послуги</h5>
                        <Nav className="flex-column">
                            <Nav.Link href="#" className="text-white">Автобуси</Nav.Link>
                            <Nav.Link href="#" className="text-white">Рейси</Nav.Link>
                            <Nav.Link href="#" className="text-white">Партнери</Nav.Link>
                        </Nav>
                    </Col>

                    {/* Social Media Links */}
                    <Col md={3}>
                        <h5>Слідуйте за нами</h5>
                        <div className="d-flex gap-2">
                            <a href="#" className="text-white"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="text-white"><i className="bi bi-twitter"></i></a>
                            <a href="#" className="text-white"><i className="bi bi-instagram"></i></a>
                            <a href="#" className="text-white"><i className="bi bi-linkedin"></i></a>
                        </div>
                    </Col>

                    {/* Legal Links */}
                    <Col md={3}>
                        <h5>Правова інформація</h5>
                        <Nav className="flex-column">
                            <Nav.Link href="#" className="text-white">Політика конфіденційності</Nav.Link>
                            <Nav.Link href="#" className="text-white">Умови використання</Nav.Link>
                            <Nav.Link href="#" className="text-white">Файли cookie</Nav.Link>
                        </Nav>
                    </Col>
                </Row>

                {/* Copyright Information */}
                <Row className="border-top pt-3">
                    <Col className="text-center">
                        <p className="mb-0">© {new Date().getFullYear()} Всі права захищені. Назва компанії.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
