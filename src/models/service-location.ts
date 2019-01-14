import { City } from './city';

export interface ServiceLocation {
    address: string;
    latitude: string;
    longitude: string;
    place_id: string;
    city: City;
}