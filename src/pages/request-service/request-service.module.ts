import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestServicePage } from './request-service';

@NgModule({
  declarations: [
    RequestServicePage,
  ],
  imports: [
    IonicPageModule.forChild(RequestServicePage),
  ],
})
export class RequestServicePageModule {}
