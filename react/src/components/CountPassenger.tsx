import React, { useState, useRef, useEffect } from 'react';

const DropdownForm: React.FC = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const formRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (formRef.current && !formRef.current.contains(event.target as Node)) {
            setShowForm(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div style={{ position: 'relative', width: 'fit-content' }} className='me-2 flex-fill mb-2'>
            <input
                type="text"
                placeholder="Кількість пасажирів"
                onClick={() => setShowForm(!showForm)}
                readOnly
                className="form-control"

            />
            {showForm && (
                <div
                    ref={formRef}
                    style={{
                        position: 'absolute',
                        top: '100%',
                        zIndex: 1000,
                        width: '110%',
                        height: '300px',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        padding: '10px',
                    }}
                >

                </div>
            )}
        </div>
    );
};

export default DropdownForm;
