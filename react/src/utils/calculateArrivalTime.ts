
// Функція для обчислення часу прибуття
export const calculateArrivalTime = (departureTime: string, duration: string): string => {
    // Розбиваємо час відправлення "HH:MM:SS"
    const [departureHours, departureMinutes] = departureTime.split(':').map(Number);

    // Створюємо об'єкт дати з часом відправлення
    const departureDate = new Date();
    departureDate.setHours(departureHours);
    departureDate.setMinutes(departureMinutes);
    departureDate.setSeconds(0); // Не беремо до уваги секунди

    // Розбиваємо тривалість подорожі "X hours Y minutes"
    const durationMatch = duration.match(/(\d+)\s*hours?\s*(\d+)?\s*minutes?/);
    const durationHours = durationMatch ? parseInt(durationMatch[1], 10) : 0;
    const durationMinutes = durationMatch && durationMatch[2] ? parseInt(durationMatch[2], 10) : 0;

    // Додаємо тривалість до часу відправлення
    departureDate.setHours(departureDate.getHours() + durationHours);
    departureDate.setMinutes(departureDate.getMinutes() + durationMinutes);

    // Повертаємо обчислений час прибуття у форматі "HH:MM"
    const arrivalHours = departureDate.getHours().toString().padStart(2, '0');
    const arrivalMinutes = departureDate.getMinutes().toString().padStart(2, '0');

    return `${arrivalHours}:${arrivalMinutes}`;
};
