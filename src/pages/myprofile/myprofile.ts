import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { PersonalInfo } from '../../models/personalInfo.model';
import { PersonalInformationPage } from '../personalInfo/personalInfo';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';
//import { map } from 'rxjs/operators';
import firebase from 'firebase';
import { Education } from '../../models/education.model';
import { WorkExperience } from '../../models/workExperience.model';

@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html'
})
export class MyprofilePage implements OnInit {
  personalInfo: PersonalInfo;
  education: Education;
  work: WorkExperience;

  // private personalInfo: Observable<PersonalInfo[]>;
  // auth: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {
      

  }

  ngOnInit(){
    this.getAuthenticatedUserProfile().subscribe(personalInfo => {
      this.personalInfo = <PersonalInfo>personalInfo;
    });

    this.getEducation().subscribe(education => {
      this.education = <Education>education;
    });

    this.getWork().subscribe(work => {
      this.work = <WorkExperience>work;
    });
  }

  getAuthenticatedUserProfile(){
    return this.afAuth.authState
    .map(user => user.uid)
    .mergeMap(authId => this.afDatabase.object(`personalInfo/${authId}`).valueChanges())
    .take(1)
  }

  getEducation(){
    return this.afAuth.authState
    .map(user => user.uid)
    .mergeMap(authId => this.afDatabase.object(`education/${authId}`).valueChanges())
    .take(1)
  }

  getWork(){
    return this.afAuth.authState
    .map(user => user.uid)
    .mergeMap(authId => this.afDatabase.object(`workExp/${authId}`).valueChanges())
    .take(1)
  }

}