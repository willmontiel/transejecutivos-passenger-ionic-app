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
import { DatePicker } from '@ionic-native/date-picker';

@Component({
  selector: 'page-request-service',
  templateUrl: 'request-service.html'
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
    private modalCtrl: ModalController,
    private datePicker: DatePicker) {

    this.user = globalProvider.getUser();
    this.getCarTypes();
    this.getAerolines();

    this.minDate = moment().format('YYYY-MM-DD');
  }

  ionViewDidLoad() {

  }

  showDatePicker() {
    this.datePicker.show({
      date: new Date(),
      minDate: new Date(),
      mode: 'date',
      okText: "Aceptar",
      cancelText: "Cerrar",
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => this.data.startDate = moment(date).format('DD MMM/YYYY'),
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  showTimePicker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      okText: "Aceptar",
      cancelText: "Cerrar",
      is24Hour: true,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then(
      date => this.data.time = moment(date).format('HH:mm'),
      err => console.log('Error occurred while getting date: ', err)
    );
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

    this.data.date = moment(this.data.startDate).format('YYYY-MM-DD');

    this.serviceProvider.requestService(this.data, this.user).subscribe(service => {
      this.service = service;
      loading.dismiss();
      
      if (service.idService) {
        this.navCtrl.pop();
        this.miscProvider.presentToast("Reserva realizada exitosamente, pronto asignaremos un conductor", 'bottom');
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
