import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
//Models
import { User } from '../../models/user';
//Providers
import { AuthProvider } from '../../providers/auth/auth';
import { MiscProvider } from '../../providers/misc/misc';
import { DbProvider } from '../../providers/db/db';
import { LocalStorageProvider } from '../../providers/global/local-storage';
import { GlobalProvider } from '../../providers/global/global';
import { ApiConfigProvider } from '../../providers/api-config/api-config';
//Pages
import { HomePage } from '../../pages/home/home';
import { RecoverPasswordPage } from '../../pages/recover-password/recover-password';

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
    private localStorageProvider: LocalStorageProvider,
    private globalProvider: GlobalProvider,
    private apiConfigProvider: ApiConfigProvider,
    public loadingCtrl: LoadingController,
    private dbProvider: DbProvider) {
  }

  ionViewDidLoad() {

  }
  
  public login() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando'
    });
    loading.present();

    this.authProvider.login(this.credentials).subscribe(user => {
      if (user.type == "passenger" || user.type == "company") {
        this.user = user;
        this.dbProvider.saveUser(this.user).then(() => {
          loading.dismiss();
          this.localStorageProvider.set(this.localStorageProvider.getUserKey(), this.user);
          this.globalProvider.setUser(this.user);

          this.navCtrl.setRoot(HomePage);
        });
      } else {
        loading.dismiss();
        let alert = this.miscProvider.createAlert("Error", "Error tipo de usuario no soportado.", ['Cerrar']);
        alert.present();
      }
      
    },
    err => {
        loading.dismiss();
        let alert = this.miscProvider.createAlert("Error", err, ['Cerrar']);
        alert.present();
    });
  }

  goToRecoverPasswordPage() {
    this.navCtrl.push(RecoverPasswordPage);
  }
}
