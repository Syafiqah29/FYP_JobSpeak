import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WorkExperiencePage } from '../workExp/workExp';
import { Education } from '../../models/education.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


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

  constructor(public navCtrl: NavController,private afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase) {

  }
  gotoWork(){
    // this.navCtrl.push(WorkExperiencePage);
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`education/${auth.uid}`).set(this.education)
       .then(() => this.navCtrl.setRoot(WorkExperiencePage));
   })
 
  }

}