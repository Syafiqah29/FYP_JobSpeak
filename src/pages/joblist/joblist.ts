import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserhomePage } from '../userhome/userhome';
import { JobdetailsPage } from '../jobdetails/jobdetails';

/**
 * Generated class for the JoblistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-joblist',
  templateUrl: 'joblist.html',
})
export class JoblistPage {

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoblistPage');
  }

  gotoHome(){
    this.navCtrl.push(UserhomePage);
  }

  gotoJoblist(){
    this.navCtrl.push(JoblistPage);
  }
  
  gotoDetails(){
    this.navCtrl.push(JobdetailsPage);
  }

  doLogout() {
    const confirm = this.alertCtrl.create({
      title: 'Log Out',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Not Yet',
          handler: () => {
            console.log('Not Yet clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.navCtrl.push(LoginPage);
          }
        }
      ]
    });
    confirm.present();
  }


}
