// src/components/NavbarComponent.tsx
import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/homePage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarComponent: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        // Redirect to login page after logout
        navigate('/login');
    };



    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">BlablaCarCopY</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">

                    <Nav className="me-auto">
                        <Nav.Link href="#">Something</Nav.Link>
                        <Nav.Link href="#">Something</Nav.Link>
                        <Nav.Link href="#">Something</Nav.Link>
                    </Nav>

                    <Nav className="ml-auto">
                        <Nav.Link href="#"><i className="bi bi-search" />1</Nav.Link>
                        <Nav.Link href="#"><i className="bi bi-person" />2</Nav.Link>
                        {token ? (
                            <>
                                <span className="navbar-text me-3">Привіт! {username}</span>
                                <Button variant="outline-light" onClick={handleLogout}>
                                    Вийти
                                </Button>
                            </>
                        ) : (
                            <Nav.Link href="/login"><i className="bi bi-person" />Увійти</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
