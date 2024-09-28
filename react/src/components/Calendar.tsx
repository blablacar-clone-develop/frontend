import React, { useState, useRef, useEffect } from 'react';
import { Calendar, DayValue } from 'react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import '../styles/homePage.css';

const CompactCalendar: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);
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

    return (
        <div style={{ position: 'relative', width: 'fit-content' }}>
            <div className="input-container">
                <input
                    value={selectedDay ? `${selectedDay.day}/${selectedDay.month}/${selectedDay.year}` : ''}
                    onClick={() => setShowCalendar(!showCalendar)}
                    placeholder="When?"
                    readOnly
                    className="location-input"
                />
                <span className="iconS C"></span>
            </div>

            {showCalendar && (
                <div ref={calendarRef} style={{ position: 'absolute', top: '100%', zIndex:1000, width:'250px' }} className="compact-calendar-wrapper">
                    <Calendar
                        value={selectedDay}
                        onChange={setSelectedDay}
                        shouldHighlightWeekends
                        colorPrimary="#0d6efd"
                        colorPrimaryLight="#b0c4ff"
                    />
                </div>
            )}
        </div>
    );
};

export default CompactCalendar;
