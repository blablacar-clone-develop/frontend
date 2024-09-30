import { Autos } from './Autos';
import { User } from './User';
import { Passenger } from './Passenger';
import { TravelPoints } from './TravelPoints';
import { TripAgreement } from './TripAgreement';
import { TripDurationAndDistance } from './TripDistanceAndDuration.tsx';
import { Options } from './Options';

export interface Trip {
    id: number;
    autos: Autos[];
    user: User;
    passengers: Passenger[];
    passengerCount: number;
    price: number;
    availableSeats: number;
    departureDate: string;
    departureTime: string;
    startTravelPoint: TravelPoints;
    finishTravelPoint: TravelPoints;
    createdAt: string; // or Date
    updatedAt: string; // or Date
    tripAgreement: TripAgreement;
    tripDurationAndDistance: TripDurationAndDistance;
    options: Options;
}