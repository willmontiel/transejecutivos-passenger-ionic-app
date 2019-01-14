import { Component, ViewChild } from '@angular/core';
import { LoadingController, NavController, NavParams, ModalController } from 'ionic-angular';
//Models
import { User } from '../../models/user';
import { Service } from '../../models/service';
import { CarType } from '../../models/car-type';
import { Aeroline } from '../../models/aeroline';
import { Passenger } from '../../models/passenger';
//Providers
import { ServiceProvider } from '../../providers/service/service';
import { MiscProvider } from '../../providers/misc/misc';
import { GlobalProvider } from '../../providers/global/global';
import { PassengerProvider } from '../../providers/passenger/passenger';
import moment from 'moment';
//Pages
import { AutoCompletePage } from '../../pages/auto-complete/auto-complete';
import { ServicePage } from '../../pages/service/service';
import { DatePicker } from '@ionic-native/date-picker';
import { AutoCompleteComponent } from 'ionic2-auto-complete';
import { ServiceLocation } from '../../models/service-location';

@Component({
  selector: 'page-request-service',
  templateUrl: 'request-service.html'
})
export class RequestServicePage {
  data: any = {
    date: '',
    time: '',
    passengers: 1,
    startAddressType: 1,
    endAddressType: 1,
    idAeroline: null
  };

  @ViewChild('searchbar')
  searchbar: AutoCompleteComponent;

  user: User;
  service: Service;
  carTypes: CarType[];
  aerolines: Aeroline[];
  passengers: Passenger[];
  startAddressHistory: ServiceLocation[];
  endAddressHistory: ServiceLocation[];
  loading: any;
  minDate: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private serviceProvider: ServiceProvider,
    private miscProvider: MiscProvider,
    private globalProvider: GlobalProvider,
    private passengerProvider: PassengerProvider,
    private modalCtrl: ModalController,
    private datePicker: DatePicker) {

    this.user = this.globalProvider.getUser();
    this.passengerProvider.setUser(this.user);
    
    this.getLists();

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

  getLists() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando'
    });
    loading.present();

    this.serviceProvider.getLists(this.user).subscribe(data => {
      this.carTypes = data.carTypes;
      this.aerolines = data.aerolines;
      this.startAddressHistory = data.startAddressHistory;
      this.endAddressHistory = data.endAddressHistory;

      loading.dismiss();
    }, err => {
      loading.dismiss();
      let alert = this.miscProvider.createAlert("Error", err, ['Cerrar']);
      alert.present();
    });
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

    this.serviceProvider.getAerolines(this.user).subscribe(aerolines => {
      this.aerolines = aerolines;
      loading.dismiss();
    }, err => {
      loading.dismiss();
      let alert = this.miscProvider.createAlert("Error", err, ['Cerrar']);
      alert.present();
    });
  }

  requestService(): void {
    this.data.date = moment(this.data.startDate, 'DD MMM/YYYY').format('YYYY-MM-DD');

    if (this.user.type == 'company') {
      let passenger = this.searchbar.getSelection();
      if (passenger && passenger.idPassenger) {
        this.data.idPassenger = passenger.idPassenger;
        this.doRequest();
      } else {
        let alert = this.miscProvider.createAlert("Error", "Por favor seleccione un pasajero", ['Cerrar']);
        alert.present();
      }
    } else {
      this.doRequest();
    }
  }

  doRequest(): void {
    let loading = this.loadingCtrl.create({
      content: 'Cargando'
    });
    loading.present();

    this.data.date = "2019-01-13";
    this.data.time = "23:00";
    console.log("Data", this.data);

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
