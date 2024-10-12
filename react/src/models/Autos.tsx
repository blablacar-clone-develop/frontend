import { Trip } from './Trip';


export interface Autos {
    id: number;
    brand: string;
    model: string;
    color: string;
    trips: Trip[];
}