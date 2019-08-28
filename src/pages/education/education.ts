import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WorkExperiencePage } from '../workExp/workExp';

@Component({
  selector: 'page-education',
  templateUrl: 'education.html'
})
export class EducationPage {

  constructor(public navCtrl: NavController) {

  }
  gotoWork(){
    this.navCtrl.push(WorkExperiencePage);
  }

}