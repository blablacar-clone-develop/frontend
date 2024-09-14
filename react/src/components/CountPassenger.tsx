import React, { useState, useRef, useEffect } from 'react';
import '../styles/homePage.css';

interface Passenger {
    id: number;
    type: string;
    isChecked: boolean; // Додаємо поле для відслідковування стану галочки
}

const DropdownForm: React.FC = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showMiniForm, setShowMiniForm] = useState<boolean>(false);
    const [passengers, setPassengers] = useState<Passenger[]>([{ id: 1, type: 'Дорослий', isChecked: true }]);

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

    // Функція для відкриття міні-форми
    const handleAddPassenger = () => {
        setShowMiniForm(true);
    };

    // Функція для вибору типу пасажира
    const handleSelectPassengerType = (type: string) => {
        const newPassenger: Passenger = { id: passengers.length + 1, type, isChecked: true };
        setPassengers((prev) => [...prev, newPassenger]);
        setShowMiniForm(false);
    };



    // Функція для обробки зміни стану галочки
    const handleCheckboxChange = (id: number) => {
        const checkedPassengersCount = passengers.filter((passenger) => passenger.isChecked).length;

        setPassengers((prev) =>
            prev.map((passenger) => {
                if (passenger.id === id) {
                    // Не дозволяємо зняти галочку, якщо це останній пасажир
                    if (checkedPassengersCount === 1 && passenger.isChecked) {
                        return passenger; // Не знімаємо галочку
                    }
                    return { ...passenger, isChecked: !passenger.isChecked };
                }
                return passenger;
            })
        );
    };

    // Рахуємо кількість обраних пасажирів, мінімум 1
    const selectedPassengersCount = Math.max(1, passengers.filter((passenger) => passenger.isChecked).length);


    return (
        <div style={{ position: 'relative', width: 'fit-content' }} className='me-2 flex-fill mb-2'>
            <input
                type="text"
                placeholder={`Кількість пасажирів: ${selectedPassengersCount}`}
                onClick={() => setShowForm(!showForm)}
                readOnly
                className="form-control inputs"
            />
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
                    {/* Виведення списку пасажирів */}
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
                            <button className="btn btn-link ms-auto">Редагувати</button>
                        </div>
                    ))}

                    {/* Лінк для додавання пільгової знижки */}
                    <div style={{ marginBottom: '10px' }}>
                        <a href="#" style={{ color: '#00f', textDecoration: 'underline' }}>+ Додати пільгову знижку</a>
                    </div>

                    {/* Горизонтальна лінія */}
                    <hr />

                    {/* Кнопка для додавання пасажира */}
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onClick={handleAddPassenger}
                        >
                            <span style={{ fontSize: '20px', marginRight: '10px' }}>+</span> Додати пасажира
                        </button>
                    </div>

                    {/* Міні-форма для вибору типу пасажира */}
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
                            <button type="button" className="btn btn-secondary" onClick={() => handleSelectPassengerType('Дорослий')}>
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
