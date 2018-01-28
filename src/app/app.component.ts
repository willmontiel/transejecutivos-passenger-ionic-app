import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RequestServicePage } from '../pages/request-service/request-service';
//Providers
import { DbProvider } from '../providers/db/db';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  constructor(public platform: Platform, 
    public statusBar: StatusBar,
    public splashScreen: SplashScreen, 
    public dbProvider: DbProvider) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.validateSession();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  private validateSession() {
    this.dbProvider.getUser().then(
      (val) => { 
        console.log(val);
        if (!val) {
          this.rootPage = LoginPage;
        } else {
          this.rootPage = HomePage;
        }
      }
    ).catch((error:any) => { console.log('Error', error); });
  }
}
