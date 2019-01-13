import { Component } from '@angular/core';
import { Platform, LoadingController, NavController, NavParams } from 'ionic-angular';

//Models
import { Service } from '../../models/service';
import { User } from '../../models/user';
//Providers
import { ServiceProvider } from '../../providers/service/service';
import { MiscProvider } from '../../providers/misc/misc';
//Pages
import { ServicePage } from '../../pages/service/service';
import { HomePage } from '../../pages/home/home';
import { GlobalProvider } from '../../providers/global/global';
import { RequestServicePage } from '../request-service/request-service';
//Vendors
import moment from 'moment';

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
    private platform: Platform,
    private globalProvider: GlobalProvider) {

    this.title = navParams.data.title;
    this.user = globalProvider.getUser();
    this.getServicesByDate(this.getDates(navParams.data.time));

    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        this.navCtrl.pop();
        this.navCtrl.push(HomePage);
      }, 2);
    });
  }

  ionViewDidLoad() {

  }

  getServicesByDate(data) {
    let loading = this.loadingCtrl.create({
      content: 'Cargando'
    });
    loading.present();
    
    this.serviceProvider.getServicesByDate(data, this.user).subscribe(services => {
      this.services = services;

      if (!this.services.length) {
        let alert = this.miscProvider.createAlert("Info", "No se encontraron reservas", ['Cerrar']);
        alert.present();
      }

      loading.dismiss();
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

  goToRequestService(service) {
    this.navCtrl.push(RequestServicePage);
  }
}
