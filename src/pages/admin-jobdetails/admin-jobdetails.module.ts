import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminJobDetailsPage } from '../admin-jobdetails/admin-jobdetails';

@NgModule({
  declarations: [
    AdminJobDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminJobDetailsPage),
  ],
})
export class AdminJobDetailsPageModule {}
