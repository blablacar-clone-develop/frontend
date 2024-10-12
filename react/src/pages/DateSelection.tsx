import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addMonths, format, subMonths, isBefore, startOfMonth, isToday } from "date-fns";
import "../styles/DateSelection.css";
import { fetchUserData } from "../utils/tokenUtils.ts";
import NavbarComponent from "../components/NavbarComponent.tsx";

const DateSelection: React.FC = () => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const [value, setValue] = useState(new Date()); // eslint-disable-line
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const today = new Date();

    const location = useLocation();
    const navigate = useNavigate();
    const { fromAddress, toAddress, selectedRoute } = location.state || {};

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
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

    const handlePrevMonth = () => {
        const currentYear = currentMonth.getFullYear();
        const currentMonthIndex = currentMonth.getMonth();

        const todayYear = today.getFullYear();
        const todayMonthIndex = today.getMonth();

        if (currentYear > todayYear || (currentYear === todayYear && currentMonthIndex > todayMonthIndex)) {
            setCurrentMonth((prev) => subMonths(prev, 1));
        }
    };

    const handleNextMonth = () => {
        setCurrentMonth((prev) => addMonths(prev, 1));
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData(navigate);
        };
        fetchData();
    }, []);

    const renderCalendar = (date: Date) => {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const daysInMonth = Array.from({ length: endOfMonth.getDate() }, (_, i) => i + 1);

        return (
            <div>
                <h3 className="headerMonth">{format(date, "LLLL yyyy")}</h3>
                <div className="calendar-grid">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                        <div
                            key={`${day}-${index}`}
                            className={`calendar-header ${index === 5 || index === 6 ? "weekend" : ""}`}
                        >
                            {day}
                        </div>
                    ))}
                    {Array(startOfMonth.getDay())
                        .fill(null)
                        .map((_, i) => (
                            <div key={`empty-${i}`} className="empty-cell"></div>
                        ))}
                    {daysInMonth.map((day) => {
                        const currentDate = new Date(date.getFullYear(), date.getMonth(), day);

                        // Забороняємо вибір днів до сьогоднішнього у поточному місяці, але залишаємо сьогоднішній активним
                        const isDisabled = isBefore(currentDate, today) && !isToday(currentDate);

                        return (
                            <div
                                key={day}
                                className={`calendar-day ${isDisabled ? "disabled-day" : ""}`}
                                onClick={() => !isDisabled && handleDateChange(currentDate)} // Забороняємо кліки для заблокованих днів
                            >
                                {day}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <main className="main">
                <NavbarComponent/>
                <main className="main3">
                    <div className="calendar-container">
                        <h3 className="when">When?</h3>
                        <div className="calendar-controls">
                            <button
                                onClick={handlePrevMonth}
                                disabled={isBefore(startOfMonth(currentMonth), startOfMonth(today))}
                            >
                                Previous
                            </button>
                            <button onClick={handleNextMonth}>Next</button>
                        </div>
                        <div className="calendars">
                            {renderCalendar(currentMonth)}
                            {renderCalendar(addMonths(currentMonth, 1))}
                        </div>
                    </div>
                </main>
            </main>
            );
            };

            export default DateSelection;
