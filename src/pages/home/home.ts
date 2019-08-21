import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { SplashscreenPage } from '../splashscreen/splashscreen';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController) {
  }
  
  nextPage(){
    this.navCtrl.push(SplashscreenPage);
  }
}


