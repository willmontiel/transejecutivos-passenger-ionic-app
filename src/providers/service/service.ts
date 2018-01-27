import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Service } from '../../models/service';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
  urlBase = '';

  constructor(public http: Http) {}

  getServicesByDate(startDate: string, endDate: string): Observable<Service[]> {
    /*
    return this.http.get(`${this.marvelApiUrl}${this.marvelApiVersion}${this.marvelAllCharacters}${this.marvelApiKey}${this.marvelHash}${this.marvelTimestamp}${this.marvelOffset}${offset}`)
      .map(res => <Character[]>res.json().data.results)
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    */
    
    return this.http.get('assets/example-data.json')
      .map(res => <Service[]>res.json().data)
      .catch((error:any) => Observable.throw(error.json().message || 'Server error'));
  }
}
