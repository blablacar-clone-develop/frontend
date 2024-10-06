import React, {useEffect, useState} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import '../styles/DateSelection.css';
import Navbar from "../components/NavbarComponent.tsx";
import Footer from "../components/main/Footer/Footer.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchUserData} from "../utils/tokenUtils.ts";

const App: React.FC = () => {
    const [value, setValue] = useState(new Date());
    const location = useLocation();
    const navigate = useNavigate();
    const { fromAddress, toAddress, selectedRoute } = location.state || {};

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Місяці йдуть від 0 до 11
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`; // Формат YYYY-MM-DD
    };


    const handleDateChange = (date: Date) => {
        setValue(date);
        const formattedDate = formatDate(date);

        navigate("/timeSelection", {
            state: {
                fromAddress,
                toAddress,
                selectedRoute,
                date: formattedDate,
            },
        });

    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData(navigate);

        };
        fetchData();
    }, []);

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
