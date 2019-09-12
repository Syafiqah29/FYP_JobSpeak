import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { EducationPage } from '../education/education';
import { PersonalInfo } from '../../models/personalInfo.model';

@Component({
  selector: 'page-personalInfo',
  templateUrl: 'personalInfo.html'
})
export class PersonalInformationPage {

  personalInfo: PersonalInfo = {
    name1: '',
    icNumber1: undefined,
    icNumber2: undefined,
    age: '',

    male: '',
    female: '',

    muslim: '',
    christian: '',
    buddhist: '',
    other: '',

    single: '',
    married: '',
    divorced: '',
    widowed: '',

    malay: '',
    kedayan: '',
    dusun: '',
    murut: '',

    address: '',
    phone: undefined,

    DLyes: '',
    DLno: '',
    DL1: '',
    DL2: '',
    DL3: '',
    DL4: '',
    DL5: '',
    DL6: '',
    DL7: '',
    DL8: '',
    DL9: '',
    DL10: '',
    DL11: '',
    DL12: '',

    parents: '',
    guardian: '',
    spouse: '',

    Fname: '',
    Fic1: '',
    Fphone: undefined,
  }
   
    personalForm: FormGroup;
    name: AbstractControl;
    icNumber: AbstractControl;
    icNumber2: AbstractControl;
    address: AbstractControl;
    phoneNumber: AbstractControl;
    age: AbstractControl;


    familyForm: FormGroup;
    Fname: AbstractControl;
    FicNumber: AbstractControl;
    FicNumber2: AbstractControl;
    Fphone: AbstractControl;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formbuilder: FormBuilder) {

    this.personalForm = formbuilder.group({
        name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z\'@ ]+')])],
        icNumber: ['', Validators.compose([Validators.required, Validators.maxLength(9), Validators.pattern('^[0|1]{2}$')])],
        icNumber2: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{6}$')])],
        address: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        phoneNumber: ['', Validators.compose([Validators.required, Validators.maxLength(7)])],
        age: ['', Validators.compose([Validators.required, Validators.min(18), Validators.max(65)])],
      });

    this.familyForm = formbuilder.group({
      Fname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z\'@ ]+')])],
        FicNumber: ['', Validators.compose([Validators.required, Validators.maxLength(9), Validators.pattern('^[0|1]{2}$')])],
        FicNumber2: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{6}$')])],
        Fphone: ['', Validators.compose([Validators.required, Validators.maxLength(7)])],
    });

      this.name = this.personalForm.controls['name'];
      this.icNumber = this.personalForm.controls['icNumber'];
      this.icNumber2 = this.personalForm.controls['icNumber2'];
      this.address = this.personalForm.controls['address'];
      this.phoneNumber = this.personalForm.controls['phoneNumber'];
      this.age = this.personalForm.controls['age'];

      this.Fname = this.familyForm.controls['Fname'];
      this.FicNumber = this.familyForm.controls['FicNumber'];
      this.FicNumber2 = this.familyForm.controls['FicNumber2'];
      this.Fphone = this.familyForm.controls['Fphone'];
  }
  gotoEducation(){
    this.navCtrl.push(EducationPage);
  }


}