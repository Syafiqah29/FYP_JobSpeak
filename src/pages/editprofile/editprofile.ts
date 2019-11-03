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

  // REFERENCE
  // saveProfile(){
  //   this.afAuth.authState.take(1).subscribe(auth =>{
  //     var ref = database().ref(`personalInfo/${auth.uid}`);
  //     ref.once('value' , (snap) => {
  //       console.log(snap.val());
  //       var profName = snap.val().name;
  //       this.afDatabase.object(`patient/` + profName + `/profile`).update({"name1" : this.personalInfo.name1});
  //     }
  //   }
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

}