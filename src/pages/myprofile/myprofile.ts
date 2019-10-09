import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { PersonalInfo } from '../../models/personalInfo.model';
import { PersonalInformationPage } from '../personalInfo/personalInfo';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'; 
//import { map } from 'rxjs/operators';
import firebase from 'firebase';

@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html'
})
export class MyprofilePage implements OnInit {

  private personalInfo: Observable<PersonalInfo[]>;
  auth: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {
      

  }

  // getActiveUser(){
  //   return firebase.auth().currentUser.uid;
  // }

  // getPersonalInfo(){
  //   let personalInfo = this.afDatabase.list<PersonalInfo>('personalInfo' , ref =>
  //   ref.orderByChild('name1').equalTo(this.getActiveUser()));
  //   return personalInfo;
  // }
 
  // ngOnInit(){
  //   this.personalInfo = this.getPersonalInfo().snapshotChanges().map(changes => {
  //     return changes.map(c => ({
  //       key: c.payload.key,
  //       ...c.payload.val()
  //     }));
  //   });
  // }

  ngOnInit(){
    this.personalInfo = this.afDatabase.list<PersonalInfo>('personalInfo').snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key,
        ...c.payload.val()
      }))
    })
  }

  // getUserProfile(){
  //   let personalInfo = this.afDatabase.list<PersonalInfo>('personalInfo' ,ref =>
  //   ref.orderByChild('name1').equalTo(this.afAuth.getActiveUser()));
  //   return personalInfo;
  // }

}