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
                        <h5>Company</h5>
                        <Nav className="flex-column">
                            <Nav.Link href="#" >About us</Nav.Link>
                            <Nav.Link href="#" >Career</Nav.Link>
                            <Nav.Link href="#" >Media</Nav.Link>
                        </Nav>
                    </Col>

                    {/* Product Links */}
                    <Col md={3}>
                        <h5>Services</h5>
                        <Nav className="flex-column">
                            <Nav.Link href="#" >Buses</Nav.Link>
                            <Nav.Link href="#">Flights</Nav.Link>
                            <Nav.Link href="#" >Partners</Nav.Link>
                        </Nav>
                    </Col>

                    {/* Social Media Links */}
                    <Col md={3}>
                        <h5>Follow us</h5>
                        <div className="d-flex gap-2">
                            <a href="#" ><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-twitter"></i></a>
                            <a href="#" ><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-linkedin"></i></a>
                        </div>
                    </Col>

                    {/* Legal Links */}
                    <Col md={3}>
                        <h5>Legal information</h5>
                        <Nav className="flex-column">
                            <Nav.Link href="#" >Privacy Policy</Nav.Link>
                            <Nav.Link href="#" >Terms of use</Nav.Link>
                            <Nav.Link href="#" >Cookies</Nav.Link>
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
