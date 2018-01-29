import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Models
import { Service } from '../../models/service';

@Component({
  selector: 'page-service',
  templateUrl: 'service.html',
})
export class ServicePage {
  service: Service;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.service = navParams.data.service;
  }

  ionViewDidLoad() {
    
  }

}
