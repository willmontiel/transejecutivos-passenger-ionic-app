import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
//Models
import { User } from '../../models/user';
//Providers
import { GlobalProvider } from '../../providers/global/global';
import { AuthProvider } from '../../providers/auth/auth';
import { MiscProvider } from '../../providers/misc/misc';
import { DbProvider } from '../../providers/db/db';
//Pages
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: User;
  data: User;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private globalProvider: GlobalProvider,
    public loadingCtrl: LoadingController,
    public miscProvider: MiscProvider,
    public dbProvider: DbProvider,
    private authProvider: AuthProvider) {

    this.user = globalProvider.getUser();
    this.data = globalProvider.getUser();
  }

  ionViewDidLoad() {
    
  }

  updateProfile() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando'
    });
    loading.present();

    this.authProvider.updateProfile(this.data, this.user).subscribe(data => {
      this.user = data.data;
      this.dbProvider.saveUser(this.user).then(() => {
        loading.dismiss();
        this.globalProvider.setUser(this.user);
        this.miscProvider.presentToast(data.message, 'bottom');
        this.navCtrl.setRoot(HomePage);
      });
    }, err => {
      loading.dismiss();
      let alert = this.miscProvider.createAlert("Error", err, ['Cerrar']);
      alert.present();
    });
  }
}
