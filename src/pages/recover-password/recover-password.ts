import { Component } from '@angular/core';
import { LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';
//Models
import { User } from '../../models/user';
//Providers
import { AuthProvider } from '../../providers/auth/auth';
import { MiscProvider } from '../../providers/misc/misc';
import { DbProvider } from '../../providers/db/db';
import { GlobalProvider } from '../../providers/global/global';
import { ApiConfigProvider } from '../../providers/api-config/api-config';
//Pages
import { LoginPage } from '../../pages/login/login';

@IonicPage()
@Component({
  selector: 'page-recover-password',
  templateUrl: 'recover-password.html',
})
export class RecoverPasswordPage {
  credentials = {username: ''};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private authProvider: AuthProvider,
    private miscProvider: MiscProvider,
    private globalProvider: GlobalProvider,
    public loadingCtrl: LoadingController,
    private dbProvider: DbProvider) {
  }

  ionViewDidLoad() {
    
  }

  public recoverPassword() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando'
    });
    loading.present();

    this.authProvider.recoverPassword(this.credentials).subscribe(response => {
        loading.dismiss();
        this.miscProvider.presentToast(response.message, 'bottom');
        this.navCtrl.setRoot(LoginPage);
    },
    err => {
        loading.dismiss();
        let alert = this.miscProvider.createAlert("Error", err, ['Cerrar']);
        alert.present();
    });
  }

}
