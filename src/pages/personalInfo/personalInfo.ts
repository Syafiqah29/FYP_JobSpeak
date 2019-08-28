import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { EducationPage } from '../education/education';

@Component({
  selector: 'page-personalInfo',
  templateUrl: 'personalInfo.html'
})
export class PersonalInformationPage {
   
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