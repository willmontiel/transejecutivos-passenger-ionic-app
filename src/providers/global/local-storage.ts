import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageProvider {
  constructor() {
    
  }

  public getUserKey() {
    return 'transejecutivos-user-session';
  }

  public set(key: string, data: any) {
    if (data) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  public get(key: string) {
    let data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
  }

  public delete(key: string) {
    localStorage.removeItem(key);
  }

}
