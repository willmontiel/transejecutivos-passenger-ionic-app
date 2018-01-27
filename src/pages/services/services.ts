import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Models
import { Service } from '../../models/service';
import { User } from '../../models/user';
//Providers
import { ServiceProvider } from '../../providers/service/service';
import { MiscProvider } from '../../providers/misc/misc';
import { AuthProvider } from '../../providers/auth/auth';
//Pages
import { ServicePage } from '../../pages/service/service';
import { LoginPage } from '../../pages/login/login';
//Vendors
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {
  services: Service[];
  user: User;
  time: string;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams, 
      private serviceProvider: ServiceProvider,
      private miscProvider: MiscProvider,
      private authProvider: AuthProvider) {
      
    this.time = navParams.data.time;
    this.validateSession();
  }

  ionViewDidLoad() {
    
  }

  getDates(time): any {
    let data = {
      startDate: moment().format('YYYY-MM-DD') + ' 00:00',
      endDate: moment().add(30, 'days').format('YYYY-MM-DD') + ' 23:59',
    };

    if (time == 'past') {
      data.startDate = moment().add(-1, 'day').format('YYYY-MM-DD') + ' 00:00';
      data.endDate = moment().add(-30, 'days').format('YYYY-MM-DD') + ' 23:59';
    }

    return data;
  }

  getServicesByDate() {
    let data = this.getDates(this.time);

    let loading = this.miscProvider.createLoader('Cargando');
    loading.present();

    this.serviceProvider.getServicesByDate(data, this.user).subscribe(services => {
      this.services = services;
      loading.dismiss();
    },
    err => {
        console.log(err);
        loading.dismiss();
        let alert = this.miscProvider.createAlert("Error", err, ['Close']);
        alert.present();
    });
  }

  validateSession() {
    this.authProvider.getSession().then(
      (val) => { 
        if (!val) {
          this.navCtrl.setRoot(LoginPage);
        } else {
          this.user = val;
          this.getServicesByDate();
        }
      }
    )
    .catch(
      (error:any) => {
        console.log('Error', error);
      }
    );
  }

  goToService(service) {
    this.navCtrl.push(ServicePage, { service: service });
  }

}
