import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

//Models
import { User } from '../../models/user';

@Injectable()
export class DbProvider {
  user: User;
  constructor(private storage: Storage) {
  
  }

  saveUser(user: User) {
    this.storage.set('user', JSON.stringify(user));
  }

  removeUser() {
    this.storage.remove('user');
  }

  getUser() {
    return this.storage.get('user');
  }
}
