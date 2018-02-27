import { AutoCompleteService } from 'ionic2-auto-complete';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
//Providers
import { ApiConfigProvider } from '../api-config/api-config';
//Models
import { User } from '../../models/user';

@Injectable()
export class PassengerProvider {
  private headers: Headers;
  labelAttribute = "completeName";
  formValueAttribute = "idPassenger"
  user: User;

  constructor(public http: Http,
    private apiConfigProvider: ApiConfigProvider) {
  }

  setUser(user: User) {
    this.user = user;
  }

  getResults(keyword:string) {
    this.headers = new Headers();
    this.headers.append('Authorization', this.user.api_key);
    let options = new RequestOptions({ headers: this.headers });

    return this.http.get(this.apiConfigProvider.get().searchPassenger + "/" + keyword, options)
      .map(res => <any[]>res.json().data)
      .catch((error:any) => Observable.throw(error.json().message || 'Server error'));
  }

  /*
  getResults(keyword: string) {
    return this.http.get("https://restcountries.eu/rest/v1/name/" + keyword)
      .map(
        result => {
          return result.json()
            .filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()))
        });
  }
  */
}
