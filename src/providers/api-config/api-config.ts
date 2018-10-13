import { Injectable } from '@angular/core';

//const URL_BASE: string = "http://app.transportesejecutivos.com";
const URL_BASE: string = "http://dev.transejecutivos.com";
//const URL_BASE: string = "/api";
const API_BASE: string = "api/passengerapp";
const API_GENERAL_BASE: string = "api/general";
const API_V1: string = "v1";

@Injectable()
export class ApiConfigProvider {
  login: string = "session/apilogin";
  searchCarType: string = "cartype/searchcartype";
  getCarTypes: string = "cartype/getall";
  getAerolines: string = "aeroline/getall";
  searchPassenger: string = "passenger/search";
  getServicesByDate: string = "getservicesbydate";
  requestService: string = "requestservice";
  updateProfile: string = "profile/update";

  constructor() {}

  get() {
    return {
      login: URL_BASE + "/" + this.login,
      getServicesByDate: URL_BASE + "/" + API_BASE + "/" + API_V1 + "/" + this.getServicesByDate,
      searchCarType: URL_BASE + "/" + this.searchCarType,
      getCarTypes: URL_BASE + "/" + API_GENERAL_BASE + "/" + API_V1 + "/" + this.getCarTypes,
      getAerolines: URL_BASE + "/" + API_GENERAL_BASE + "/" + API_V1 + "/" + this.getAerolines,
      searchPassenger: URL_BASE + "/" + API_GENERAL_BASE + "/" + API_V1 + "/" + this.searchPassenger,
      requestService: URL_BASE + "/" + API_BASE + "/" + API_V1 + "/" + this.requestService,
      updateProfile: URL_BASE + "/" + API_GENERAL_BASE + "/" + API_V1 + "/" + this.updateProfile,
    }
  }

  getVersion() {
    return 'Versión 2.0.2';
  }
}
