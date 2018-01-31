import { CarType } from './car-type';

export interface Car {
    idCar: number;
    name: string;
    model: string;
    image: string;
    carType: CarType;
}