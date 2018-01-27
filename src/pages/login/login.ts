import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Models
import { User } from '../../models/user';
//Providers
import { AuthProvider } from '../../providers/auth/auth';
import { MiscProvider } from '../../providers/misc/misc';
import { ApiConfigProvider } from '../../providers/api-config/api-config';
//Pages
import { HomePage } from '../../pages/home/home';

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
    private miscProvider: MiscProvider,
    private apiConfigProvider: ApiConfigProvider) {
  }

  ionViewDidLoad() {

  }
  
  public login() {
    let loading = this.miscProvider.createLoader('Cargando');
    loading.present();

    this.authProvider.login(this.credentials).subscribe(user => {
      this.user = user;
      this.authProvider.saveSession(this.user);
      loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    },
    err => {
        console.log(err);
        loading.dismiss();
        let alert = this.miscProvider.createAlert("Error", err, ['Cerrar']);
        alert.present();
    });
  }

}
