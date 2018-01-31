import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
//Providers
import { ApiConfigProvider } from '../api-config/api-config';
//Models
import { User } from '../../models/user';

@Injectable()
export class AuthProvider {

  private headers: Headers;

  constructor(public http: Http, 
    private apiConfigProvider: ApiConfigProvider) {
    
  }

  login(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Por favor digite su correo y la contraseña.");
    }

    return this.http.post(this.apiConfigProvider.get().login, credentials)
      .map(res => <User>res.json())
      .catch((error:any) => Observable.throw(error.json().message || console.log(JSON.stringify(error)) + 'Server error'));
  }

  updateProfile(data: any, user: User): Observable<User> {
    this.headers = new Headers();
    this.headers.append('Authorization', user.api_key);
    this.headers.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: this.headers });

    return this.http.post(this.apiConfigProvider.get().updateProfile, data, options)
      .map(res => <User>res.json().data)
      .catch((error:any) => Observable.throw(error.json().message || 'Server error'));
  }
}
