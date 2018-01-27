import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

//Models
import { DataList } from '../../models/data-list';

//Providers
import { ServiceProvider } from '../../providers/service/service';
import { MiscProvider } from '../../providers/misc/misc';

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {
  dataList: DataList[];
  constructor(public navCtrl: NavController, 
      public navParams: NavParams, 
      private serviceProvider: ServiceProvider,
      private miscProvider: MiscProvider,
      public loadingCtrl: LoadingController,
      private alertCtrl: AlertController) {
      
    let loading = miscProvider.createLoader('Cargando');

    loading.present();
    serviceProvider.getServicesByDate('', '').subscribe(dataList => {
      this.dataList = dataList;
      loading.dismiss();
    },
    err => {
        console.log(err);
        loading.dismiss();
        let alert = miscProvider.createAlert("Error", err, ['Close']);
        alert.present();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');
  }

  toggleSection(i) {
    this.dataList[i].open = !this.dataList[i].open;
  }
 
  toggleItem(i, j) {
    this.dataList[i].children[j].open = !this.dataList[i].children[j].open;
  }

}
