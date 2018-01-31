import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//Models
import { Service } from '../../models/service';
//Native
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
//Providers
import { MiscProvider } from '../../providers/misc/misc';


@Component({
  selector: 'page-service',
  templateUrl: 'service.html',
})
export class ServicePage {
  service: Service;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private callNumber: CallNumber,
    private miscProvider: MiscProvider,
    private sms: SMS) {
    this.service = navParams.data.service;
  }

  ionViewDidLoad() {

  }

  callDriver(service) {
    if (service.driver.phone1 && this.miscProvider.isValidMobile(service.driver.phone1)) {
      this.callNumber.callNumber(service.driver.phone1, true)
        .then(() => console.log('Launched dialer!'))
        .catch((err) => console.log('Error launching dialer' , err));
    } else if (service.driver.phone2 && this.miscProvider.isValidMobile(service.driver.phone2)) {
      this.callNumber.callNumber(service.driver.phone2, true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
    }
  }

  sendSMSToDriver(service) {
    if (service.driver.phone1 && this.miscProvider.isValidMobile(service.driver.phone1)) {
      this.sms.send(service.driver.phone1, '');
    } else if (service.driver.phone2 && this.miscProvider.isValidMobile(service.driver.phone2)) {
      this.sms.send(service.driver.phone2, '');
    }
  }

}
