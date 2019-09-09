import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JoblistPage } from '../joblist/joblist';

/**
 * Generated class for the UserhomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userhome',
  templateUrl: 'userhome.html',
})
export class UserhomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserhomePage');
  }

  gotoJoblist(){
    this.navCtrl.push(JoblistPage);
  }
}
