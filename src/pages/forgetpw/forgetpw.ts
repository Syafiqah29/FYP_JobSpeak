import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VerifyPage } from '../verify/verify';

@Component({
  selector: 'page-forgetpw',
  templateUrl: 'forgetpw.html'
})
export class ForgetpwPage {

  constructor(public navCtrl: NavController) {

  }

  gotoVerify(){
      this.navCtrl.push(VerifyPage);
  }
}