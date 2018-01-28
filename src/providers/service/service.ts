import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
//Providers
import { ApiConfigProvider } from '../api-config/api-config';
import { DbProvider } from '../db/db';
//Models
import { Service } from '../../models/service';
import { User } from '../../models/user';
import { CarType } from '../../models/car-type';


/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http,
    private apiConfigProvider: ApiConfigProvider,
    private dbProvider: DbProvider) {
  }

  getServicesByDate(data: any, user: User): Observable<Service[]> {
    let headers = new Headers();
    
    headers.append('authorization', user.api_key);
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiConfigProvider.get().getServicesByDate, data, options)
      .map(res => <Service[]>res.json().data)
      .catch((error:any) => Observable.throw(error.json().message || 'Server error'));
  }

  getCarTypes(user: User): Observable<CarType[]> {
    this.headers.append('authorization', user.api_key);
    let options = new RequestOptions({ headers: this.headers });

    return this.http.get(this.apiConfigProvider.get().getCarTypes, options)
      .map(res => <Service[]>res.json().data)
      .catch((error:any) => Observable.throw(error.json().message || 'Server error'));
  }
}
