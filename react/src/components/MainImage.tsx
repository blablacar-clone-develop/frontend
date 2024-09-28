import React from 'react';
import '../styles/homePage.css';
import busImage from '../assets/mainBus.jpg'

const BusImage: React.FC = () => {

    return (
        <div style={{ textAlign: 'center', margin: '10px' }}>
            <img
                src={busImage}
                alt="Bus"
                style={{
                    width: '90%',
                    height: 'auto',
                    borderRadius: '15px'
                }}
            />
        </div>
    );
};

export default BusImage;
