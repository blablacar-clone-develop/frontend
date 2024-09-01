import React, { useState, useRef, useEffect } from 'react';
import { Calendar, DayValue } from 'react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

const CalendarInput: React.FC = () => {
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
        <div style={{ position: 'relative', width: 'fit-content' }} className='me-2 flex-fill mb-2'>
            <input
                value={selectedDay ? `${selectedDay.day}/${selectedDay.month}/${selectedDay.year}` : ''}
                onClick={() => setShowCalendar(!showCalendar)}
                placeholder="Коли?"
                readOnly
                className="form-control"
            />
            {showCalendar && (
                <div ref={calendarRef} style={{ position: 'absolute', top: '100%', zIndex: 1000 }} >
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

export default CalendarInput;
