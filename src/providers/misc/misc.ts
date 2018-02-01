import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from 'ionic-angular';
//Native
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';

@Injectable()
export class MiscProvider {

  constructor(public loadingCtrl: LoadingController, 
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private callNumber: CallNumber,
    private sms: SMS) { 

  }

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
    let value = parseInt(number);

    if (value != NaN && typeof value == "number") {
      return true;
    }

    return false;
  }

  presentToast(msg, position) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: position
    });
    toast.present();
  }

  callDriver(service) {
    if (service.driver.phone1 && this.isValidMobile(service.driver.phone1)) {
      this.callNumber.callNumber(service.driver.phone1, true)
        .then(() => console.log('Launched dialer!'))
        .catch((err) => console.log('Error launching dialer' , err));
    } else if (service.driver.phone2 && this.isValidMobile(service.driver.phone2)) {
      this.callNumber.callNumber(service.driver.phone2, true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
    }
  }

  sendSMSToDriver(service) {
    let options: any = {
        android: {
            intent: 'INTENT'  // send SMS with the native android SMS messaging
        }
    };

    if (service.driver.phone1 && this.isValidMobile(service.driver.phone1)) {
      this.sms.send(service.driver.phone1, 'Hola ', options);
    } else if (service.driver.phone2 && this.isValidMobile(service.driver.phone2)) {
      this.sms.send(service.driver.phone2, 'Hola, ', options);
    }
  }
}
