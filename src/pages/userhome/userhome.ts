import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams, ToastController  } from 'ionic-angular';
import { JoblistPage } from '../joblist/joblist';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { MyprofilePage } from '../myprofile/myprofile';

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

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, 
    public navParams: NavParams, private afAuth: AngularFireAuth,
    private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserhomePage');
    this.afAuth.authState.take(1).subscribe(data =>{
      if (data && data.email && data.email && data.uid){
        this.toast.create({
          message: `Welcome to JOBSPEAK!!! ${data.email}`,
          duration: 3000
        }).present();
      }
      else{
        this.toast.create({
          message: `Could not find authentication details.`,
          duration: 3000
        }).present();
      }
    })
  }

  gotoHome(){
    this.navCtrl.push(UserhomePage);
  }
  

  gotoJoblist(){
    this.navCtrl.push(JoblistPage);
  }

  gotoProfile(){
    this.navCtrl.push(MyprofilePage);
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
