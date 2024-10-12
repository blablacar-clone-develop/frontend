import { Autos } from './Autos';
import { Trip } from './Trip';
import {Avatar} from "./Avatar.tsx";

export interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    dateOfBirthday: string; // ISO date string or Date
    gender: string;
    autos: Autos[];
    trips: Trip[];
    avatar: Avatar;
}