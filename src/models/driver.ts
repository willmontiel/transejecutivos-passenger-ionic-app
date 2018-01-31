import { Car } from './car';

export interface Driver {
    idDriver: number;
    name: string;
    lastname: string;
    phone1: string;
    phone2: string;
    image: string;
    email: string;
    email2: string;
    car: Car;
}