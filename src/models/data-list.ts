import { Service } from './service';

export interface DataList {
    name: string;
    children: Service[];
    open: boolean;
}