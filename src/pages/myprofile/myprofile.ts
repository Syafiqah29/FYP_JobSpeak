import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { PersonalInfo } from '../../models/personalInfo.model';
import { PersonalInformationPage } from '../personalInfo/personalInfo';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'; 
//import { map } from 'rxjs/operators';

@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html'
})
export class MyprofilePage implements OnInit {

  private personalInfo: Observable<PersonalInfo[]>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {
  }
 
  ngOnInit(){
    this.personalInfo = this.afDatabase.list<PersonalInfo>('personalInfo').snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key,
        ...c.payload.val()
      }));
    });
  }

  // ionViewDidLoad(){
  //   this.afAuth.authState.subscribe(data => {
  //     if (data && data.email && data.uid){
  //       this.personalInfoRef$ = this.afDatabase.list(`personal/${data.uid}`);
  //     }
  //   })
  // }
  
  // ionViewDidLoad(){
  //   this.afAuth.authState.subscribe(data => {
  //     console.log('personalInfo' + data.uid);
  //     return data.uid;
  //   });
  // }


}