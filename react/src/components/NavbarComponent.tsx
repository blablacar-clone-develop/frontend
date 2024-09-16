// src/components/NavbarComponent.tsx
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
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
        localStorage.removeItem('userId');
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
                        {token ? ( <> <Nav.Link href="/personSettings"><i className="bi bi-list" /></Nav.Link>
                        <Nav.Link href="/profile"><i className="bi bi-person" /> </Nav.Link>


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
