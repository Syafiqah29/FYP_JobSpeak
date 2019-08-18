import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ForgetpwPage } from '../forgetpw/forgetpw';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

  gotoForgetpw(){
    this.navCtrl.push(ForgetpwPage);
  }
  
  gotoSignup(){
    this.navCtrl.push(SignupPage);
  }
}