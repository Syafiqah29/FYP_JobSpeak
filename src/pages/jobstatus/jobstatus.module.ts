import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobstatusPage } from './jobstatus';

@NgModule({
  declarations: [
    JobstatusPage,
  ],
  imports: [
    IonicPageModule.forChild(JobstatusPage),
  ],
})
export class JobstatusPageModule {}
