import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Models
import { User } from '../../models/user';
//Providers
import { AuthProvider } from '../../providers/auth/auth';
import { MiscProvider } from '../../providers/misc/misc';
import { DbProvider } from '../../providers/db/db';
import { GlobalProvider } from '../../providers/global/global';
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
    private globalProvider: GlobalProvider,
    private apiConfigProvider: ApiConfigProvider,
    private dbProvider: DbProvider) {
  }

  ionViewDidLoad() {

  }
  
  public login() {
    let loading = this.miscProvider.createLoader('Cargando');
    loading.present();

    this.authProvider.login(this.credentials).subscribe(user => {
      this.user = user;
      this.dbProvider.saveUser(this.user).then(() => {
        loading.dismiss();
        this.globalProvider.setUser(this.user);
        this.navCtrl.setRoot(HomePage);
      });
    },
    err => {
        loading.dismiss();
        let alert = this.miscProvider.createAlert("Error", err, ['Cerrar']);
        alert.present();
    });
  }

}
