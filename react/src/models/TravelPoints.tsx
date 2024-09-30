export interface TravelPoints {
    id: number;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    createdAt: string; // Можна змінити на Date, якщо будете обробляти як об'єкт Date
    updatedAt: string;  // ISO string format or Date if handled accordingly
}