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
    DOB: '',

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
    Fic: '',
    Fphone: undefined,
  }
   
    personalForm: FormGroup;
    name: AbstractControl;
    icNumber: AbstractControl;
    address: AbstractControl;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formbuilder: FormBuilder) {

    this.personalForm = formbuilder.group({
        name: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        icNumber: ['', Validators.compose([Validators.required, Validators.maxLength(9), Validators.pattern('^[0-1]+-[0-9]')])],
        address: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      });

      this.name = this.personalForm.controls['name'];
      this.icNumber = this.personalForm.controls['icNumber'];
      this.address = this.personalForm.controls['address'];
  }
  gotoEducation(){
    this.navCtrl.push(EducationPage);
  }


}