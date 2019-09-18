import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddingJobPage } from './adding-job';

@NgModule({
  declarations: [
    AddingJobPage,
  ],
  imports: [
    IonicPageModule.forChild(AddingJobPage),
  ],
})
export class AddingJobPageModule {}
