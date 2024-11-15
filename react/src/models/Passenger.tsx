import { User } from './User';
import {Trip} from "./Trip.tsx";


export interface Passenger {
    id: number;                   // Represents the unique ID of the passenger
    trip: Trip;               // Represents the ID of the trip associated with the passenger
    user: User;           // Represents the User entity, optional since it can be null
    passengerType: string;        // Represents the type of the passenger
}
