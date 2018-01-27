import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Models
import { Service } from '../../models/service';

//Providers
import { ServiceProvider } from '../../providers/service/service';
import { MiscProvider } from '../../providers/misc/misc';

//Pages
import { ServicePage } from '../../pages/service/service';

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {
  services: Service[];
  constructor(public navCtrl: NavController, 
      public navParams: NavParams, 
      private serviceProvider: ServiceProvider,
      private miscProvider: MiscProvider) {
      
    let loading = miscProvider.createLoader('Cargando');

    loading.present();
    serviceProvider.getServicesByDate('', '').subscribe(services => {
      this.services = services;
      loading.dismiss();
    },
    err => {
        console.log(err);
        loading.dismiss();
        let alert = miscProvider.createAlert("Error", err, ['Close']);
        alert.present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');
  }

  goToService(service) {
    this.navCtrl.push(ServicePage, { service: service });
  }

}
