import { Injectable } from '@angular/core';
//Models
import { User } from '../../models/user';
import { LocalStorageProvider } from '../../providers/global/local-storage';

@Injectable()
export class GlobalProvider {
  user: User;
  constructor(private localStorageProvider: LocalStorageProvider) {
    
  }

  public setUser(user: User) {
    this.user = user;
  }

  public getUser() {
    return this.user;
  }

  public deleteUser() {
    this.localStorageProvider.delete(this.localStorageProvider.getUserKey());
    this.user = null;
  }

}
