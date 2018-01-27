import { Injectable } from '@angular/core';
import {LoadingController, AlertController } from 'ionic-angular';

/*
  Generated class for the MiscProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MiscProvider {

  constructor(public loadingCtrl: LoadingController, private alertCtrl: AlertController) {}

  createLoader(msg: string = "Please wait...") : any { 
    return this.loadingCtrl.create({
      content: msg,
      dismissOnPageChange: true
    });
  }

  createAlert(title: string = "Error", subTitle: string = "Error...", buttons: Array<any>) : any {
    return this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
  }
}
