import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
//Providers
import { ApiConfigProvider } from '../api-config/api-config';
//Models
import { User } from '../../models/user';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: Http, private apiConfigProvider: ApiConfigProvider) {
    console.log('Hello AuthProvider Provider');
  }

  login(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Por favor digite su correo y la contraseña.");
    }

    return this.http.get(this.apiConfigProvider.get().login)
      .map(
        res => <User>res.json().data
      )
      .catch(
        (error:any) => Observable.throw(error.json().message || 'Server error')
      );
  }

}
