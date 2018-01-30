import { Component } from '@angular/core';
import { LoadingController, IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
//Models
import { User } from '../../models/user';
import { Service } from '../../models/service';
import { CarType } from '../../models/car-type';
import { Aeroline } from '../../models/aeroline';
//Providers
import { ServiceProvider } from '../../providers/service/service';
import { MiscProvider } from '../../providers/misc/misc';
import { GlobalProvider } from '../../providers/global/global';
import moment from 'moment';
//Pages
import { AutoCompletePage } from '../../pages/auto-complete/auto-complete';
import { ServicePage } from '../../pages/service/service';

@Component({
  selector: 'page-request-service',
  templateUrl: 'request-service.html',
})
export class RequestServicePage {
  data: any = {
    date: '',
    time: '',
    passengers: 1,
    idAeroline: null
  };

  user: User;
  service: Service;
  carTypes: CarType[];
  aerolines: Aeroline[];
  loading: any;
  minDate: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private serviceProvider: ServiceProvider,
    private miscProvider: MiscProvider,
    private globalProvider: GlobalProvider,
    private modalCtrl: ModalController) {

    this.user = globalProvider.getUser();
    this.getCarTypes();
    this.getAerolines();

    this.minDate = moment().format('YYYY-MM-DD');
  }

  ionViewDidLoad() {

  }

  getCarTypes() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando'
    });
    loading.present();

    this.serviceProvider.getCarTypes(this.user).subscribe(carTypes => {
      this.carTypes = carTypes;
      loading.dismiss();
    }, err => {
      loading.dismiss();
      let alert = this.miscProvider.createAlert("Error", err, ['Cerrar']);
      alert.present();
    });
  }

  getAerolines() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando'
    });
    loading.present();

    this.serviceProvider.getAerolines(this.user).subscribe(aeroline => {
      this.aerolines = aeroline;
      loading.dismiss();
    }, err => {
      loading.dismiss();
      let alert = this.miscProvider.createAlert("Error", err, ['Cerrar']);
      alert.present();
    });
  }

  requestService() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando'
    });
    loading.present();

    this.serviceProvider.requestService(this.data, this.user).subscribe(service => {
      this.service = service;
      loading.dismiss();
      
      if (service.idService) {
        this.navCtrl.pop();
        this.navCtrl.push(ServicePage, { service: service });
      }
    }, err => {
      loading.dismiss();
      let alert = this.miscProvider.createAlert("Error", err, ['Cerrar']);
      alert.present();
    });
  }

  showAddressModal (type) {
    let modal = this.modalCtrl.create(AutoCompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      if (data) {
        if (type == 'source') {
          this.data.startAddress = data.description;
          this.data.source = {
            address: data.description,
            place_id: data.place_id,
          };
        } else if (type == 'destiny') {
          this.data.endAddress = data.description;
          this.data.destiny = {
            address: data.description,
            place_id: data.place_id,
          };
        }
      }
    });
    modal.present();
  }
}
