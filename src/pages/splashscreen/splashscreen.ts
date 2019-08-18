import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login'

@Component({
  selector: 'page-splashscreen',
  templateUrl: 'splashscreen.html'
})
export class SplashscreenPage {

  constructor(public navCtrl: NavController) {

  }
  gotoLogin(){
      this.navCtrl.push(LoginPage);
  }

}