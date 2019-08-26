import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ForgetpwPage } from '../forgetpw/forgetpw';
import { SignupPage } from '../signup/signup';
import { UserhomePage } from '../userhome/userhome';

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

  gotoUser(){
    this.navCtrl.push(UserhomePage);
  }
}