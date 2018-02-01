import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//Models
import { Service } from '../../models/service';
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
    private miscProvider: MiscProvider) {
    this.service = navParams.data.service;
  }

  ionViewDidLoad() {

  }
}
