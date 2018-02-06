import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ServicesPage } from '../pages/services/services';
import { ServicePage } from '../pages/service/service';
import { LoginPage } from '../pages/login/login';
import { RequestServicePage } from '../pages/request-service/request-service';
import { AutoCompletePage } from '../pages/auto-complete/auto-complete';
import { ProfilePage } from '../pages/profile/profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { ServiceProvider } from '../providers/service/service';
import { MiscProvider } from '../providers/misc/misc';
import { AuthProvider } from '../providers/auth/auth';
import { ApiConfigProvider } from '../providers/api-config/api-config';
import { DbProvider } from '../providers/db/db';
import { GlobalProvider } from '../providers/global/global';

//Vendors
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { DatePickerModule } from 'ion-datepicker';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ServicesPage,
    ServicePage,
    RequestServicePage,
    AutoCompletePage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthShortNames: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
      dayShortNames: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    }),
    HttpModule,
    IonicStorageModule.forRoot({
      name: '__transejecutivosp',
         driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
    DatePickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ServicesPage,
    ServicePage,
    RequestServicePage,
    AutoCompletePage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,
    MiscProvider,
    AuthProvider,
    ApiConfigProvider,
    DbProvider,
    GlobalProvider,
    CallNumber,
    SMS
  ]
})
export class AppModule {}
