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
        'title': 'Ver servicios',
        'icon': 'list',
        'color': 'secondary',
        'page': 'ServicesPage'
      },
      {
        'title': 'Solicitar servicio',
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
