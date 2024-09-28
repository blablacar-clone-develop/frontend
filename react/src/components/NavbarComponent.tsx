
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
        <Navbar className="myNavBar" expand="lg">
            <Container className="d-flex justify-content-between align-items-center">
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="custom-link" href="/createTravel">Post trip</Nav.Link>
                        <Nav.Link className="custom-link" href="#">Something</Nav.Link>
                        <Nav.Link className="custom-link" href="#">Something</Nav.Link>
                    </Nav>


                    <div className="d-flex justify-content-center " style={{ flex: '1' }}>
                        <div  className="myIconImage" />
                    </div>

                    <Nav className="ml-auto">
                        {token ? (
                            <>
                                <Nav.Link href="/personSettings">
                                    <div className="burgerMenu"/>
                                </Nav.Link>
                                <Nav.Link href="/profile">
                                    <div className="person"/>
                                </Nav.Link>

                            </>
                        ) : (
                            <Nav.Link href="/login">
                                <i className="bi bi-person" /> Увійти
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;