import { User } from './User';

export interface Passenger {
    id: number;
    tripId: number;
    user: User;
}
