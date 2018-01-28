import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServicesPage } from '../../pages/services/services';
import { RequestServicePage } from '../../pages/request-service/request-service';
import { Platform } from 'ionic-angular';

//Providers
import { DbProvider } from '../../providers/db/db';
import { GlobalProvider } from '../../providers/global/global';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pages = [];

  constructor(public navCtrl: NavController, 
      private platform: Platform, 
      private globalProvider: GlobalProvider,
      private dbProvider: DbProvider) {
    
    console.log("Global ", globalProvider.getUser);

    this.pages = [
      {
        'title': 'Mis reservas',
        'icon': 'list-box',
        'color': 'secondary',
        'page': 'ServicesPage'
      },
      {
        'title': 'Reservas anteriores',
        'icon': 'archive',
        'color': 'orange',
        'page': 'OlderServicesPage'
      },
      {
        'title': 'Nueva reserva',
        'icon': 'briefcase',
        'color': 'primary',
        'page': 'RequestServicePage'
      },
      {
        'title': 'Buscar servicio',
        'icon': 'search',
        'color': 'dark',
        'page': 'SearchService'
      },
      {
        'title': 'Llámenos',
        'icon': 'call',
        'color': 'dark-brown',
        'page': 'CallUs'
      },
      {
        'title': 'Cerrar sesión',
        'icon': 'close-circle',
        'color': 'danger',
        'page': 'Logout'
      },
      {
        'title': 'Salir',
        'icon': 'exit',
        'color': 'success',
        'page': 'Exit'
      },
    ]
  }
  
  goToPage(page) {
    if (page == 'ServicesPage') {
      this.navCtrl.push(ServicesPage, {time: 'present'});
    } else if (page == 'OlderServicesPage') {
      this.navCtrl.push(ServicesPage, {time: 'past'});
    } else if (page == 'RequestServicePage') {
      this.navCtrl.push(RequestServicePage);
    } else if (page == 'Logout') {
      this.logout();
    } else if (page == 'Exit') {
      this.platform.exitApp();
    }
  }

  logout() {
    this.dbProvider.removeUser().then(() => { 
      this.navCtrl.push(LoginPage);
    });
  }
}
