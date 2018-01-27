import { Aeroline } from './aeroline';
import { CarType } from './car-type';
import { Company } from './company';
import { Subcompany } from './subcompany';
import { ServiceLocation } from './service-location';
import { Passenger } from './passenger';
import { Driver } from './driver';

export interface Service {
    idService: number;
    status: number;
    code: string;
    flyCode: string;
    startDate: string,
    niceStartDate: string,
    niceStartTime: string,
    notifiedPassenger: number;
    date: string;
    time: string;
    totalPassengers: number;
    open: boolean;
    aeroline: Aeroline;
    carType: CarType;
    company: Company;
    subcompany: Subcompany;
    destiny: ServiceLocation;
    driver: Driver;
    passengers: Passenger[];
}