import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { PersonalInfo } from '../../models/personalInfo.model';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';
import { Education } from '../../models/education.model';
import { WorkExperience } from '../../models/workExperience.model';
import { MyprofilePage } from '../myprofile/myprofile';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage implements OnInit {

  personalInfo = {} as PersonalInfo;
  education = {} as Education;
  work = {} as WorkExperience;

  personalForm: FormGroup;
  name: AbstractControl;
  icNumber: AbstractControl;
  icNumber2: AbstractControl;
  address: AbstractControl;
  phoneNumber: AbstractControl;
  age1: AbstractControl;
  gender1: AbstractControl;
  religion1: AbstractControl;
  status: AbstractControl;
  race1: AbstractControl;
  DL1: AbstractControl;
  LClass1: AbstractControl;

  familyForm: FormGroup;
  Fname: AbstractControl;
  FicNumber: AbstractControl;
  FicNumber2: AbstractControl;
  Fphone: AbstractControl;
  relation: AbstractControl;

  workForm: FormGroup;
  organizationName: AbstractControl;
  titlePost: AbstractControl;
  reasonLeaving: AbstractControl;
  refereeName: AbstractControl;
  refereeNumber: AbstractControl;
  year: AbstractControl;
  year2: AbstractControl;
  skills1: AbstractControl;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private formbuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private afDatabase: AngularFireDatabase) {
      
      this.personalForm = formbuilder.group({
        name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z\'@ ]+')])],
        icNumber: ['', Validators.compose([Validators.required, Validators.maxLength(2), Validators.pattern('^[0|1]{2}$')])],
        icNumber2: ['', Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]{6}$')])],
        address: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        phoneNumber: ['', Validators.compose([Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9]{7}$')])],
        age1: ['', Validators.compose([Validators.required, Validators.min(18), Validators.max(65)])],
        gender1: ['', Validators.required],
        religion1: ['', Validators.required],
        status: ['', Validators.required],
        race1: ['', Validators.required],
        DL1: ['', Validators.required],
        LClass1: ['', Validators.required]
      });

    this.familyForm = formbuilder.group({
      Fname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z\'@ ]+')])],
        FicNumber: ['', Validators.compose([Validators.required, Validators.maxLength(2), Validators.pattern('^[0|1]{2}$')])],
        FicNumber2: ['', Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]{6}$')])],
        Fphone: ['', Validators.compose([Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9]{7}$')])],
        relation: ['', Validators.required]
    });

    this.workForm = formbuilder.group({
      organizationName: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]*$')])],
      titlePost: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]*$')])],
      reasonLeaving: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
      refereeName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z\'@ ]+')])],
      refereeNumber: ['', Validators.compose([Validators.required, Validators.maxLength(7)])],
      year: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{4}$')])],
      year2: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{4}$')])],
      skills1: ['', Validators.required]
    });

      this.name = this.personalForm.controls['name'];
      this.address = this.personalForm.controls['address'];
      this.phoneNumber = this.personalForm.controls['phoneNumber'];
      this.age1 = this.personalForm.controls['age1'];
      this.religion1 = this.personalForm.controls['religion1'];
      this.status = this.personalForm.controls['status'];
      this.DL1 = this.personalForm.controls['DL1'];
      this.LClass1 = this.personalForm.controls['LClass1'];

      this.Fname = this.familyForm.controls['Fname'];
      this.Fphone = this.familyForm.controls['Fphone'];
      this.relation = this.familyForm.controls['relation'];

      this.organizationName = this.workForm.controls['organizationName'];
      this.titlePost = this.workForm.controls['titlePost'];
      this.reasonLeaving = this.workForm.controls['reasonLeaving'];
      this.refereeName = this.workForm.controls['refereeName'];
      this.refereeNumber = this.workForm.controls['refereeNumber'];
      this.year = this.workForm.controls['year'];
      this.year2 = this.workForm.controls['year2'];
      this.skills1 = this.workForm.contains['skills1'];

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
          "Oresult" : this.education.Oresult,

          "Hschool" : this.education.Hschool,
          "Hcourse": this.education.Hcourse,

          "Dschool" : this.education.Dschool,
          "Dcourse": this.education.Dcourse
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