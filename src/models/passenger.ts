import { City } from './city';
import { ServiceLocation } from './service-location';
import { CostCenter } from './cost-center';

export interface Passenger {
    idPassenger: number;
    name: string;
    lastname: string;
    longitude: string;
    source: ServiceLocation;
    costCenter: CostCenter;
}