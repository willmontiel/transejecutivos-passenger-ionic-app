import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServicesPage } from '../../pages/services/services';
import { RequestServicePage } from '../../pages/request-service/request-service';

//Providers
import { AuthProvider } from '../../providers/auth/auth';
//Pages
import { LoginPage } from '../../pages/login/login';
//Models
import { User } from '../../models/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pages = [];
  user: User;

  constructor(public navCtrl: NavController,
    private authProvider: AuthProvider) {

    this.validateSession();

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

  validateSession() {
    this.authProvider.getSession().then(
      (val) => { 
        if (!val) {
          this.navCtrl.setRoot(LoginPage);
        } else {
          this.user = val;
        }
      }
    )
    .catch(
      (error:any) => {
        console.log('Error', error);
      }
    );
  }
  
  goToPage(page) {
    if (page == 'ServicesPage') {
      this.navCtrl.push(ServicesPage, {time: 'present'});
    } else if (page == 'OlderServicesPage') {
      this.navCtrl.push(ServicesPage, {time: 'past'});
    } else if (page == 'RequestServicePage') {
      this.navCtrl.push(RequestServicePage);
    }
  }
}
