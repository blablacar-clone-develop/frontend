import React, {useEffect, useState} from 'react';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import '../styles/homePage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const NavbarComponent: React.FC = () => {
    const token = localStorage.getItem('token');
    const [hasCar, setHasCar] = useState<boolean>(false); // State to track if the user has a car
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const API_URL = import.meta.env.VITE_BASE_URL_API || "";

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                const userId = localStorage.getItem("userId"); // Replace with actual user ID extraction logic

                try {
                    const response = await axios.get(`${API_URL}/api/users/hasCar/${userId}`);
                    setHasCar(response.data.hasCar); // Set hasCar based on API response
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchData();
    }, [token]);

    const handleCreateTravel = () => {
        if (hasCar) {
            navigate("/createTravel");
        } else {
            setShowModal(true);
        }
    };
    const handleClose = () => setShowModal(false);
    return (
        <>
        <Navbar className="myNavBar" expand="lg">
            <Container className="d-flex justify-content-between align-items-center">
                <Navbar.Toggle aria-controls="navbar-nav"/>
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/personSettings">
                            <div className="burgerMenu"/>
                        </Nav.Link>
                        <Nav.Link className="custom-link myLinkStyle" onClick={handleCreateTravel}>Publish trip</Nav.Link>
                    </Nav>


                    {/*<div className="d-flex justify-content-center " style={{ flex: '1' }}>*/}
                    {/*    <Nav.Link href="/">*/}
                    {/*        <div  className="myIconImage5" />*/}
                    {/*    </Nav.Link>*/}
                    {/*</div>*/}

                    <Nav className="ml-auto">
                        {token ? (
                            <>
                                <Nav.Link href="/profile">
                                    <div className="person"/>
                                </Nav.Link>

                            </>
                        ) : (
                            <Nav.Link href="/login">
                                <i className="bi bi-person"/> Login
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>

            </Container>
            <a className="myIconImage5" href="/"/>
        </Navbar>
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Travel Creation Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body>You must have a car to create a travel.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
};

export default NavbarComponent;