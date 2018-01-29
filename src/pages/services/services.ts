import { Component } from '@angular/core';
import { LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';

//Models
import { Service } from '../../models/service';
import { User } from '../../models/user';
//Providers
import { ServiceProvider } from '../../providers/service/service';
import { MiscProvider } from '../../providers/misc/misc';
//Pages
import { ServicePage } from '../../pages/service/service';
import { LoginPage } from '../../pages/login/login';
import { GlobalProvider } from '../../providers/global/global';
//Vendors
import moment from 'moment';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {
  services: Service[];
  user: User;
  title: string;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    private serviceProvider: ServiceProvider,
    private miscProvider: MiscProvider,
    private globalProvider: GlobalProvider,
    private callNumber: CallNumber,
    private sms: SMS) {

    this.title = navParams.data.title;
    this.user = globalProvider.getUser();
    this.getServicesByDate(this.getDates(navParams.data.time));
  }

  ionViewDidLoad() {

  }

  getServicesByDate(data) {
    let loading = this.loadingCtrl.create({
      content: 'Cargando',
      dismissOnPageChange: true
    });
    loading.present();

    this.serviceProvider.getServicesByDate(data, this.user).subscribe(services => {
      this.services = services;
      loading.dismiss();
      if (!this.services.length) {
        let alert = this.miscProvider.createAlert("Atención", "No se encontraron servicios.", ['Cerrar']);
        alert.present();
      }
    }, err => {
      loading.dismiss();
      let alert = this.miscProvider.createAlert("Error", err, ['Cerrar']);
      alert.present();
    });
  }

  getDates(time): any {
    let data = {
      startDate: moment().format('YYYY-MM-DD') + ' 00:00',
      endDate: moment().add(30, 'days').format('YYYY-MM-DD') + ' 23:59',
    };

    if (time == 'past') {
      data.endDate = moment().add(-1, 'day').format('YYYY-MM-DD') + ' 00:00';
      data.startDate = moment().add(-30, 'days').format('YYYY-MM-DD') + ' 23:59';
    }

    return data;
  }

  goToService(service) {
    this.navCtrl.push(ServicePage, { service: service });
  }

  callDriver(service) {
    if (service.driver.phone1 && this.miscProvider.isValidMobile(service.driver.phone1)) {
      this.callNumber.callNumber(service.driver.phone1, true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
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
