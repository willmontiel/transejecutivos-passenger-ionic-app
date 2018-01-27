import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ServicesPage } from '../pages/services/services';
import { ServicePage } from '../pages/service/service';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { ServiceProvider } from '../providers/service/service';
import { MiscProvider } from '../providers/misc/misc';
import { AuthProvider } from '../providers/auth/auth';
import { ApiConfigProvider } from '../providers/api-config/api-config';
import { DbProvider } from '../providers/db/db';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ServicesPage,
    ServicePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot({
      name: '__transejecutivosp',
         driverOrder: ['sqlite', 'indexeddb', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ServicesPage,
    ServicePage
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
  ]
})
export class AppModule {}
