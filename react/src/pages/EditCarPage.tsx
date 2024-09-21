import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
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
    const API_URL = import.meta.env.VITE_BASE_URL_API || "KeyNOTfound";

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
                    <Link to={`/edit-car/${car.id}`} className="btn btn-primary m-2">
                        Edit auto
                    </Link>
                    <Link to={`/delete-car/${car.id}`} className="btn btn-danger m-2">
                        Delete auto
                    </Link>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default EditCarPage;
