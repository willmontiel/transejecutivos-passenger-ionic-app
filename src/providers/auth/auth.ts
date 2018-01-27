import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
//Providers
import { ApiConfigProvider } from '../api-config/api-config';
import { DbProvider } from '../db/db';
//Models
import { User } from '../../models/user';

@Injectable()
export class AuthProvider {

  constructor(public http: Http, 
    private apiConfigProvider: ApiConfigProvider,
    private dbProvider: DbProvider) {
    
  }

  login(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Por favor digite su correo y la contraseña.");
    }

    return this.http.post(this.apiConfigProvider.get().login, credentials)
      .map(
        res => <User>res.json()
      )
      .catch(
        (error:any) => Observable.throw(error.json().message || 'Server error')
      );
  }

  saveSession(user: User) {
    this.dbProvider.saveUser(user);
  }

  getSession() {
    return this.dbProvider.getUser();
  }
}
