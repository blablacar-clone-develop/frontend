import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Import react-bootstrap modal and button
import NavBar from "../components/NavbarComponent";
import Footer from "../components/main/Footer/Footer";

interface Brand {
    id: number;
    name: string;
}

interface Model {
    id: number;
    name: string;
    brand: Brand;
}

interface Color {
    id: number;
    name: string;
    hex: string;
}

interface Car {
    id: number;
    brand: Brand;
    model: Model;
    color: Color;
}

const EditCarPage: React.FC = () => {
    const navigate = useNavigate();
    const { carId } = useParams<{ carId: string }>();
    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // State for showing the modal
    const API_URL = import.meta.env.VITE_BASE_URL_API || "KeyNOTfound";

    // Function to handle modal visibility
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(`${API_URL}/api/autos/getByAutoId/${carId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data === "token") {
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    localStorage.removeItem('userId');
                    navigate("/login");
                }

                setCar(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching car data:', error);
                setLoading(false);
            }
        };

        fetchCarData();
    }, [carId]);

    const handleDeleteCar = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API_URL}/api/autos/delete/${carId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            handleCloseModal(); // Close the modal after successful delete
            navigate('/personSettings'); // Navigate to the profile or other relevant page after delete
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    if (loading) {
        return <p>Loading car details...</p>;
    }

    if (!car) {
        return <p>Car data not available.</p>;
    }

    return (
        <main className="main">
            <NavBar />
            <div className="profile-section mb-5">
                <h2 className="text-center">{car.brand.name} {car.model.name}</h2>

                <div className="car-details text-center">
                    <Link to={`/brandSelect/${car.id}`} className="btn btn-primary m-2">
                        Edit auto
                    </Link>
                    <button className="btn btn-danger m-2" onClick={handleShowModal}>
                        Delete Auto
                    </button>
                </div>
            </div>

            {/* Modal for confirmation */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this car? This action cannot be undone.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteCar}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </main>
    );
};

export default EditCarPage;
