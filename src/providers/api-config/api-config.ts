import { Injectable } from '@angular/core';

const URL_BASE: string = "http://dev.transejecutivos.com";
const API_BASE: string = "api/passengerapp";
const API_V1: string = "v1";

@Injectable()
export class ApiConfigProvider {
  login: string = "session/apilogin";
  getServicesByDate: string = "service/getservicesbydate";

  constructor() {}

  get() {
    return {
      login: URL_BASE + "/" + this.login,
      getServicesByDate: URL_BASE + "/" + API_BASE + "/" + API_V1 + "/" + this.getServicesByDate
    }
  }
}
