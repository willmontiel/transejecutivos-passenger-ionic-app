import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServicesPage } from '../../pages/services/services';
import { RequestServicePage } from '../../pages/request-service/request-service';
import { Platform } from 'ionic-angular';

//Providers
import { ApiConfigProvider } from '../../providers/api-config/api-config';
//Pages
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pages = [];

  constructor(public navCtrl: NavController,
    private platform: Platform,
    private apiConfigProvider: ApiConfigProvider) {
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
      /*
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
      */
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
      this.navCtrl.push(ServicesPage, {time: 'present', title: 'Lista de reservas'});
    } else if (page == 'OlderServicesPage') {
      this.navCtrl.push(ServicesPage, { time: 'past',  title: 'Reservas anteriores'});
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
