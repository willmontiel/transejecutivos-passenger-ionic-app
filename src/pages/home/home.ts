import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServicesPage } from '../../pages/services/services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToServices() {
    this.navCtrl.push(ServicesPage);
  }
}
