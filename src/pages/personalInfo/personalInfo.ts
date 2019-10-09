import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { EducationPage } from '../education/education';
import { PersonalInfo } from '../../models/personalInfo.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DatePicker } from '@ionic-native/date-picker';

@Component({
  selector: 'page-personalInfo',
  templateUrl: 'personalInfo.html'
})
export class PersonalInformationPage {

  personalInfo = {} as PersonalInfo;

    personalForm: FormGroup;
    name: AbstractControl;
    icNumber: AbstractControl;
    icNumber2: AbstractControl;
    address: AbstractControl;
    phoneNumber: AbstractControl;
    dob1: AbstractControl;
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

    // year = null;
    // currentDate = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formbuilder: FormBuilder,
    private afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase,
    public viewCtrl: ViewController) {

    this.personalForm = formbuilder.group({
        name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z\'@ ]+')])],
        icNumber: ['', Validators.compose([Validators.required, Validators.maxLength(9), Validators.pattern('^[0|1]{2}$')])],
        icNumber2: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{6}$')])],
        address: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        phoneNumber: ['', Validators.compose([Validators.required, Validators.maxLength(7)])],
        dob1: ['', Validators.compose([Validators.required, Validators.min(2001), Validators.max(12-31-1954)])],
        gender1: ['', Validators.required],
        religion1: ['', Validators.required],
        status: ['', Validators.required],
        race1: ['', Validators.required],
        DL1: ['', Validators.required],
        LClass1: ['', Validators.required]
      });

    this.familyForm = formbuilder.group({
      Fname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z\'@ ]+')])],
        FicNumber: ['', Validators.compose([Validators.required, Validators.maxLength(9), Validators.pattern('^[0|1]{2}$')])],
        FicNumber2: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{6}$')])],
        Fphone: ['', Validators.compose([Validators.required, Validators.maxLength(7)])],
        relation: ['', Validators.required]
    });

      this.name = this.personalForm.controls['name'];
      this.icNumber = this.personalForm.controls['icNumber'];
      this.icNumber2 = this.personalForm.controls['icNumber2'];
      this.address = this.personalForm.controls['address'];
      this.phoneNumber = this.personalForm.controls['phoneNumber'];
      this.dob1 = this.personalForm.controls['dob1'];
      this.gender1 = this.personalForm.controls['gender1'];
      this.religion1 = this.personalForm.controls['religion1'];
      this.status = this.personalForm.controls['status'];
      this.race1 = this.personalForm.controls['race1'];
      this.DL1 = this.personalForm.controls['DL1'];
      this.LClass1 = this.personalForm.controls['LClass1'];

      this.Fname = this.familyForm.controls['Fname'];
      this.FicNumber = this.familyForm.controls['FicNumber'];
      this.FicNumber2 = this.familyForm.controls['FicNumber2'];
      this.Fphone = this.familyForm.controls['Fphone'];
      this.relation = this.familyForm.controls['relation'];
  }

  // getDate(){
  //   this.currentDate = new Date();
  //   this.year = this.currentDate.getFullYear();
  //   this.year = this.year - 17;
  // }

  gotoEducation(personalInfo: PersonalInfo){
    this.navCtrl.push(EducationPage);
    this.afAuth.authState.take(1).subscribe(auth => 
      this.afDatabase.object(`personalInfo/${auth.uid}`).set(this.personalInfo)
       .then(() => this.navCtrl.setRoot(EducationPage)));
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad PersonalInformationPage')
  }

  


}