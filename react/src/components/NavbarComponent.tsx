import React from 'react';
import { Navbar, Nav, Container, Form, FormControl } from 'react-bootstrap';
import '../styles/homePage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const NavbarComponent: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#">Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                    </Form>
                    <Nav className="me-auto">
                        <Nav.Link href="#">Something</Nav.Link>
                        <Nav.Link href="#">Something</Nav.Link>
                        <Nav.Link href="#">Something</Nav.Link>
                    </Nav>

                    <Nav className="ml-auto">
                        <Nav.Link href="#"><i className="bi bi-search" />1</Nav.Link>
                        <Nav.Link href="#"><i className="bi bi-globe" />2</Nav.Link>
                        <Nav.Link href="#"><i className="bi bi-person" />3</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
