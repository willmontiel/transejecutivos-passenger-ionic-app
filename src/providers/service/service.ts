import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
//Providers
import { ApiConfigProvider } from '../api-config/api-config';
import { DbProvider } from '../db/db';
//Models
import { Service } from '../../models/service';
import { User } from '../../models/user';


/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
  constructor(public http: Http,
    private apiConfigProvider: ApiConfigProvider,
    private dbProvider: DbProvider) {

  }

  getServicesByDate(data: any, user: User): Observable<Service[]> {
    let headers = new Headers();
    headers.append('Authorization', user.api_key);

    console.log("D" , data);
    return this.http.post(this.apiConfigProvider.get().getServicesByDate, data, { headers: headers })
      .map(res => <Service[]>res.json().data)
      .catch((error:any) => Observable.throw(error.json().message || 'Server error'));
  }
}
