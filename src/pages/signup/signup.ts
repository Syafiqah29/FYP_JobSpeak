import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  accountForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  confirmPassword: AbstractControl;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formbuilder: FormBuilder) {

      this.accountForm = formbuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Za-z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        password: ['', Validators.compose([Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*().-_]).{8,16})')])],
        confirmPassword: ['', Validators.compose([Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*().-_]).{8,16})')])]
      });

      this.email = this.accountForm.controls['email'];
      this.password = this.accountForm.controls['password'];
      this.confirmPassword = this.accountForm.controls['confirmPassword'];

  }
  gotoLogin(){
    this.navCtrl.push(LoginPage);
  }
}