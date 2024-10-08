import React, { useState, useRef, useEffect } from 'react';
import '../styles/homePage.css';

interface Passenger {
    id: number;
    type: string;
    isChecked: boolean;
}

interface DropdownFormProps {
    setPassengers: (passengers: Passenger[]) => void;
    initialPassengers: Passenger[]; // Додаємо пропс для початкових пасажирів
}

const DropdownForm: React.FC<DropdownFormProps> = ({ setPassengers, initialPassengers }) => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    // Initialize passengers with initial passengers if provided
    const [passengers, setLocalPassengers] = useState<Passenger[]>(initialPassengers.length > 0 ? initialPassengers : [
        {
            id: 1,
            type: token && username ? username : 'Дорослий',
            isChecked: true
        }
    ]);

    const [showForm, setShowForm] = useState<boolean>(false);
    const [showMiniForm, setShowMiniForm] = useState<boolean>(false);

    const formRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (formRef.current && !formRef.current.contains(event.target as Node)) {
            setShowForm(false);
            setShowMiniForm(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Update passengers and propagate the change to parent
    const updatePassengers = (updatedPassengers: Passenger[]) => {
        setLocalPassengers(updatedPassengers);
        setPassengers(updatedPassengers);
    };

    const handleAddPassenger = () => {
        setShowMiniForm(true);
    };

    const handleSelectPassengerType = (type: string) => {
        const newPassenger: Passenger = { id: passengers.length + 1, type, isChecked: true };
        const updatedPassengers = [...passengers, newPassenger];
        updatePassengers(updatedPassengers);
        setShowMiniForm(false);
    };

    const handleCheckboxChange = (id: number) => {
        const updatedPassengers = passengers.map((passenger) => {
            if (passenger.id === id) {
                return { ...passenger, isChecked: !passenger.isChecked };
            }
            return passenger;
        });

        updatePassengers(updatedPassengers);
    };

    const selectedPassengersCount = passengers.filter((passenger) => passenger.isChecked).length;

    return (
        <div style={{ position: 'relative', width: 'fit-content' }}>
            <div className="input-container">
                <input
                    type="text"
                    placeholder={`Count: ${selectedPassengersCount}`}
                    onClick={() => setShowForm(!showForm)}
                    readOnly
                    className="location-input"
                />
                <span className="iconS P"></span>
            </div>
            {showForm && (
                <div
                    ref={formRef}
                    style={{
                        position: 'absolute',
                        top: '100%',
                        zIndex: 1000,
                        width: '110%',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        padding: '10px',
                    }}
                >
                    {passengers.map((passenger) => (
                        <div key={passenger.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <input
                                type="checkbox"
                                id={`passenger-${passenger.id}`}
                                checked={passenger.isChecked}
                                onChange={() => handleCheckboxChange(passenger.id)}
                            />
                            <label htmlFor={`passenger-${passenger.id}`} style={{ marginLeft: '10px' }}>
                                {passenger.type}
                            </label>
                            <button className="btn btn-link ms-auto">Edit</button>
                        </div>
                    ))}

                    <div style={{ marginBottom: '10px' }}>
                        <a href="#" style={{ color: '#00f', textDecoration: 'underline' }}>+ Add preferential discount</a>
                    </div>

                    <hr />

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onClick={handleAddPassenger}
                        >
                            <span style={{ fontSize: '20px', marginRight: '10px' }}>+</span> Add a passenger
                        </button>
                    </div>

                    {showMiniForm && (
                        <div className='miniForm'>
                            <h5>Виберіть тип пасажира:</h5>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => handleSelectPassengerType('Дитина')}
                                style={{ marginRight: '10px' }}
                            >
                                Дитина
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => handleSelectPassengerType('Підліток')}
                                style={{ marginRight: '10px' }}
                            >
                                Підліток
                            </button>
                            <button type="button" className="btn btn-secondary"
                                    onClick={() => handleSelectPassengerType('Дорослий')}>
                                Дорослий
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DropdownForm;
