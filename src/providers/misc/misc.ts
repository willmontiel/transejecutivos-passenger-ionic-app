import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from 'ionic-angular';

/*
  Generated class for the MiscProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MiscProvider {

  constructor(public loadingCtrl: LoadingController, 
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,) { }

  createLoader(msg: string = "Please wait..."): any {
    return this.loadingCtrl.create({
      content: msg
    });
  }

  createAlert(title: string = "Error", subTitle: string = "Error...", buttons: Array<any>): any {
    return this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
  }

  isValidMobile(number: string): any {
    let regExp = /^[0-9]{10}$/;

    if (!regExp.test(number)) {
      return false;
    }

    return true;
  }

  presentToast(msg, position) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: position
    });
    toast.present();
  }
}
