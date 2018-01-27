import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServicesPage } from '../../pages/services/services';
import { RequestServicePage } from '../../pages/request-service/request-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pages = [];
  constructor(public navCtrl: NavController) {
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
        'page': 'ServicesPage'
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
        'page': 'RequestServicePage'
      },
      {
        'title': 'Llámenos',
        'icon': 'call',
        'color': 'dark-brown',
        'page': 'RequestServicePage'
      },
      {
        'title': 'Cerrar sesión',
        'icon': 'close-circle',
        'color': 'danger',
        'page': 'RequestServicePage'
      },
      {
        'title': 'Salir',
        'icon': 'exit',
        'color': 'success',
        'page': 'RequestServicePage'
      },
    ]
  }

  goToPage(page) {
    if (page == 'ServicesPage') {
      this.navCtrl.push(ServicesPage);
    } else if (page == 'RequestServicePage') {
      this.navCtrl.push(RequestServicePage);
    }
    
  }
}
