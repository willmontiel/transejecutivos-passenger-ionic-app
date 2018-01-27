import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Models
import { User } from '../../models/user';
//Providers
import { AuthProvider } from '../../providers/auth/auth';
import { MiscProvider } from '../../providers/misc/misc';
//Pages
import { ServicesPage } from '../../pages/services/services';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials = { username: '', password: '' };
  user: User;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private authProvider: AuthProvider,
    private miscProvider: MiscProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  
  public login() {
    let loading = this.miscProvider.createLoader('Cargando');
    loading.present();

    this.authProvider.login(this.credentials).subscribe(user => {
      this.user = user;
      loading.dismiss();
    },
    err => {
        console.log(err);
        loading.dismiss();
        let alert = this.miscProvider.createAlert("Error", err, ['Close']);
        alert.present();
    });
  }

}
