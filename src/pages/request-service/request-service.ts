import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Models
import { User } from '../../models/user';
import { CarType } from '../../models/car-type';
//Providers
import { ServiceProvider } from '../../providers/service/service';
import { MiscProvider } from '../../providers/misc/misc';
import { DbProvider } from '../../providers/db/db';
//Vendors
import { GooglePlacesAutocompleteComponentModule } from 'ionic2-google-places-autocomplete';

@IonicPage()
@Component({
  selector: 'page-request-service',
  templateUrl: 'request-service.html',
})
export class RequestServicePage {

  data: any = {
    date: '',
    time: ''
  };

  user: User;
  carTypes: CarType[];
  loading: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private serviceProvider: ServiceProvider,
    private miscProvider: MiscProvider,
    private dbProvider: DbProvider) {
      
    this.loading = this.miscProvider.createLoader('Cargando');
    this.loading.present();

    this.dbProvider.getUser().then(
      (val) => { 
        console.log("user", val);
        if (val) {
          this.user = val;
          this.getCarTypes();
        } 
        
      }
    )
    .catch((error:any) => {console.log('Error', error);});
  }

  ionViewDidLoad() {

  }

  getCarTypes() {
    console.log("Getting cars");
    this.serviceProvider.getCarTypes(this.user).subscribe(carTypes => {
      this.carTypes = carTypes;
      console.log(this.carTypes);
      this.loading.dismiss();
    },
    err => {
        console.log(err);
        this.loading.dismiss();
        let alert = this.miscProvider.createAlert("Error", err, ['Cerrar']);
        alert.present();
    });
  }

  requestService() {

  }

  setSource(data: any) {
    console.log(data);
  }

  setDestiny(data: any) {
    console.log(data);
  }
}
