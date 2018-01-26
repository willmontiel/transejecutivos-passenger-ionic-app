import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Models
import { DataList } from '../../models/data-list';

//Providers
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {
  dataList: DataList[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private serviceProvider: ServiceProvider) {
    serviceProvider.getServicesByDate('', '').subscribe(dataList => {
      this.dataList = dataList;
    },
    err => {
        console.log(err);
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
