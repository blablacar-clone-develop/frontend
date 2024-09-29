import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/homePage.css';

interface CompactCalendarProps {
    selectedDay: Date | null;
    setSelectedDay: (date: Date | null) => void;
}

const CompactCalendar: React.FC<CompactCalendarProps> = ({ selectedDay, setSelectedDay }) => {
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const calendarRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
            setShowCalendar(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDateChange = (date: Date | null) => {
        setSelectedDay(date);
        setShowCalendar(false);
    };

    return (
        <div style={{ position: 'relative', width: 'fit-content' }}>
            <div className="input-container">
                <input
                    value={selectedDay ? selectedDay.toLocaleDateString() : ''}
                    onClick={() => setShowCalendar(!showCalendar)}
                    placeholder="When?"
                    readOnly
                    className="location-input"
                />
                <span className="iconS C"></span>
            </div>

            {showCalendar && (
                <div ref={calendarRef} style={{ position: 'absolute', top: '100%', zIndex: 1000, width: '250px' }} className="compact-calendar-wrapper">
                    <DatePicker
                        selected={selectedDay}
                        onChange={handleDateChange}
                        inline
                        minDate={new Date()}
                    />
                </div>
            )}
        </div>
    );
};

export default CompactCalendar;
