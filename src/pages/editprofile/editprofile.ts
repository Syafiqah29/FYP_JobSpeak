import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { PersonalInfo } from '../../models/personalInfo.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';
//import { map } from 'rxjs/operators';
import firebase from 'firebase';
import { Education } from '../../models/education.model';
import { WorkExperience } from '../../models/workExperience.model';
import { MyprofilePage } from '../myprofile/myprofile';


@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage implements OnInit {

  personalInfo = {} as PersonalInfo;
  education = {} as Education;
  work = {} as WorkExperience;

    // personalForm: FormGroup;
    // name: AbstractControl;

  // personalInfo: PersonalInfo;
  // education: Education;
  // work: WorkExperience;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {
      
      // this.personalForm = formbuilder.group({
      //   name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z\'@ ]+')])]
      // });
      // this.name = this.personalForm.controls['name'];

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

  saveProfile(){
    this.afAuth.authState.take(1).subscribe(auth => {
        this.afDatabase.object(`personalInfo/${auth.uid}`)
        .update({"name1" : this.personalInfo.name1,
      "icNumber1" : this.personalInfo.icNumber1});
      })
    this.navCtrl.push(MyprofilePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

}