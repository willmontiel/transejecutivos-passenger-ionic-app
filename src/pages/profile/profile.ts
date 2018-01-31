import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: User

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private globalProvider: GlobalProvider) {
    this.user = globalProvider.getUser();
  }

  ionViewDidLoad() {
    
  }

  updateProfile() {
    
  }

}
