import { Trips } from './Trips';

export interface Autos {
    id: number;
    brand: string;
    model: string;
    color: string;
    trips: Trips[];
}