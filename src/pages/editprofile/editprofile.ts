import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
    private alertCtrl: AlertController,
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
        .update({
          "name1" : this.personalInfo.name1,
          "icNumber1" : this.personalInfo.icNumber1,
          "icNumber3" : this.personalInfo.icNumber3,
          "age" : this.personalInfo.age,
          "gender": this.personalInfo.gender,
          "religion": this.personalInfo.religion,
          "martialStatus": this.personalInfo.martialStatus,
          "race": this.personalInfo.race,
          "address1": this.personalInfo.address1,
          "phone": this.personalInfo.phone,
          "DL": this.personalInfo.DL,
          "LClass": this.personalInfo.LClass,

          "relationship": this.personalInfo.relationship,
          "Fname1": this.personalInfo.Fname1,
          "Fic1": this.personalInfo.Fic1,
          "Fic2": this.personalInfo.Fic2,
          "Fphone1": this.personalInfo.Fphone1,
        });
      });

      this.afAuth.authState.take(1).subscribe(auth => {
        this.afDatabase.object(`education/${auth.uid}`)
        .update({
          "Oschool" : this.education.Oschool,
          "Oyear" : this.education.Oyear,
          "Oyear2" : this.education.Oyear2,
          "Oresult" : this.education.Oresult,

          "Aschool" : this.education.Aschool,
          "Ayear" : this.education.Ayear,
          "Ayear2" : this.education.Ayear2,
          "Aresult" : this.education.Aresult,
          
          "Nschool" : this.education.Nschool,
          "Nyear" : this.education.Nyear,
          "Nyear2" : this.education.Nyear2,
          "Ncourse": this.education.Ncourse,
          "Nresult" : this.education.Nresult,

          "Hschool" : this.education.Hschool,
          "Hyear" : this.education.Hyear,
          "Hyear2" : this.education.Hyear2,
          "Hcourse": this.education.Hcourse,
          "Hresult" : this.education.Hresult,

          "Dschool" : this.education.Dschool,
          "Dyear" : this.education.Dyear,
          "Dyear2" : this.education.Dyear2,
          "Dcourse": this.education.Dcourse,
          "Dresult" : this.education.Dresult,

          "Mschool" : this.education.Mschool,
          "Myear" : this.education.Myear,
          "Myear2" : this.education.Myear2,
          "Mcourse": this.education.Mcourse,
          "Mresult" : this.education.Mresult,

          "Pschool" : this.education.Pschool,
          "Pyear" : this.education.Pyear,
          "Pyear2" : this.education.Pyear2,
          "Pcourse": this.education.Pcourse,
          "Presult" : this.education.Presult,
        });
      });

      this.afAuth.authState.take(1).subscribe(auth => {
        this.afDatabase.object(`workExp/${auth.uid}`)
        .update({
          "organization" : this.work.organization,
          "post" : this.work.post,
          "WorkYear" : this.work.WorkYear,
          "WorkYear2" : this.work.WorkYear2,
          "reason" : this.work.reason,
          "referee" : this.work.referee,
          "RefereeNumber" : this.work.RefereeNumber,
          "skills" : this.work.skills,
        });
      });
      
      let prompt = this.alertCtrl.create({
        title: 'Success!',
        subTitle: 'Your Profile have successfully updated!',
        buttons: [
          {
            text: 'OK',
            handler: data => {
              console.log('OK clicked')
            }
          }
        ]
      });
      prompt.present();

    this.navCtrl.push(MyprofilePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

}