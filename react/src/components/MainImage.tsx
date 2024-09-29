import React from 'react';
import '../styles/homePage.css';
import busImage from '../assets/mainBus.jpg'

const BusImage: React.FC = () => {

    return (
        <div style={{ textAlign: 'center', margin: '10px', overflow: 'hidden', height: '500px' }}>
            <img
                src={busImage}
                alt="Bus"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '15px'
                }}
            />
        </div>
    );
};

export default BusImage;
