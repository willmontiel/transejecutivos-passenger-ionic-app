import { Injectable } from '@angular/core';
//Models
import { User } from '../../models/user';

@Injectable()
export class GlobalProvider {
  user: User;
  constructor() {
    
  }

  public setUser(user: User) {
    this.user = user;
  }

  public getUser() {
    return this.user;
  }

}
