import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import '../styles/DateSelection.css';
import Navbar from "../components/NavbarComponent.tsx";
import Footer from "../components/main/Footer/Footer.tsx";
import {useLocation, useNavigate} from "react-router-dom";

const App: React.FC = () => {
    const [value, setValue] = useState(new Date());
    const location = useLocation();
    const navigate = useNavigate();
    const { fromAddress, toAddress, selectedRoute } = location.state || {};
    const handleDateChange = (date: Date) => {
        setValue(date);
        navigate("/timeSelection", {
            state: {
                fromAddress,
                toAddress,
                selectedRoute,
                date
            },
        });

    };

    return (
        <main className="main">
            <div className="calendar-container">
                <h2>When?</h2>
                <Calendar
                    onChange={handleDateChange}
                    value={value}
                    locale="en-US"
                    nextLabel="→"
                    prevLabel="←"
                    formatShortWeekday={(locale, date) =>
                        date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)
                    }
                />
            </div>
        </main>
    );
};

export default App;
