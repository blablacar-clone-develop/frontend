import React from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import '../styles/homePage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarComponent: React.FC = () => {
    const token = localStorage.getItem('token');

    return (
        <Navbar className="myNavBar" expand="lg">
            <Container className="d-flex justify-content-between align-items-center">
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/personSettings">
                            <div className="burgerMenu"/>
                        </Nav.Link>
                        <Nav.Link className="custom-link myLinkStyle" href="/createTravel">Publish trip</Nav.Link>
                    </Nav>


                    <div className="d-flex justify-content-center " style={{ flex: '1' }}>
                        <Nav.Link href="/">
                            <div  className="myIconImage5" />
                        </Nav.Link>
                    </div>

                    <Nav className="ml-auto">
                        {token ? (
                            <>

                                <Nav.Link href="/profile">
                                    <div className="person"/>
                                </Nav.Link>

                            </>
                        ) : (
                            <Nav.Link href="/login">
                                <i className="bi bi-person" /> Login
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;