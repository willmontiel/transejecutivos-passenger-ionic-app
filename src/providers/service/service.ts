import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
//Providers
import { ApiConfigProvider } from '../api-config/api-config';
import { DbProvider } from '../db/db';
//Models
import { Service } from '../../models/service';
import { User } from '../../models/user';
import { CarType } from '../../models/car-type';

@Injectable()
export class ServiceProvider {

  private headers: Headers;

  constructor(public http: Http,
    private apiConfigProvider: ApiConfigProvider,
    private dbProvider: DbProvider,
    private storage: Storage) {
  }

  getServicesByDate(data: any, user: User): Observable<Service[]> {

    this.headers = new Headers();
    this.headers.append('Authorization', user.api_key);
    let options = new RequestOptions({ headers: this.headers });

    return this.http.post(this.apiConfigProvider.get().getServicesByDate, data, options)
      .map(res => <Service[]>res.json().data)
      .catch((error:any) => Observable.throw(error.json().message || 'Server error'));
  }

  getCarTypes(user: User): Observable<CarType[]> {
    this.headers = new Headers();
    this.headers.append('Authorization', user.api_key);
    let options = new RequestOptions({ headers: this.headers });

    return this.http.get(this.apiConfigProvider.get().getCarTypes, options)
      .map(res => <Service[]>res.json().data)
      .catch((error:any) => Observable.throw(error.json().message || 'Server error'));
  }
}
