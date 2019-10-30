import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminSendNotifPage } from './admin-send-notif';

@NgModule({
  declarations: [
    AdminSendNotifPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminSendNotifPage),
  ],
})
export class AdminSendNotifPageModule {}
