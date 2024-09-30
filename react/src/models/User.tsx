import { Autos } from './Autos';
import { Trips } from './Trips';

export interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    dateOfBirthday: string; // ISO date string or Date
    gender: string;
    autos: Autos[];
    trips: Trips[];
}