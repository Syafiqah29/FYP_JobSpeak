import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WorkExperiencePage } from '../workExp/workExp';
import { Education } from '../../models/education.model';

@Component({
  selector: 'page-education',
  templateUrl: 'education.html'
})
export class EducationPage {

  education: Education = {
    Oschool: '',
    Oyear: undefined,

    Aschool: '',
    Ayear: undefined,

    Nschool: '',
    Nyear: undefined,
    Ncourse: '',

    Hschool: '',
    Hyear: undefined,
    Hcourse: '',

    Dschool: '',
    Dyear: undefined,
    Dcourse: '',

    Mschool: '',
    Myear: undefined,
    Mcourse: '',

    Pschool: '',
    Pyear: undefined,
    Pcourse: '',
  }

  constructor(public navCtrl: NavController) {

  }
  gotoWork(){
    this.navCtrl.push(WorkExperiencePage);
  }

}