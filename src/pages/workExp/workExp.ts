import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'page-workExp',
  templateUrl: 'workExp.html'
})
export class WorkExperiencePage {

  workForm: FormGroup;
  organizationName: AbstractControl;
  titlePost: AbstractControl;
  reasonLeaving: AbstractControl;
  refereeName: AbstractControl;
  refereeNumber: AbstractControl;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formbuilder: FormBuilder) {
      
      this.workForm = formbuilder.group({
        organizationName: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]*$')])],
        titlePost: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]*$')])],
        reasonLeaving: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]*$')])],
        refereeName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z\'@ ]+')])],
        refereeNumber: ['', Validators.compose([Validators.required, Validators.maxLength(7)])],
      });

      this.organizationName = this.workForm.controls['organizationName'];
      this.titlePost = this.workForm.controls['titlePost'];
      this.reasonLeaving = this.workForm.controls['reasonLeaving'];
      this.refereeName = this.workForm.controls['refereeName'];
      this.refereeNumber = this.workForm.controls['refereeNumber'];
  }
  gotoLogin(){
    this.navCtrl.push(LoginPage);
  }

}