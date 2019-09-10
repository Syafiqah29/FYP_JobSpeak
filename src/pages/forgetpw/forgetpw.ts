import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { VerifyPage } from '../verify/verify';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-forgetpw',
  templateUrl: 'forgetpw.html'
})
export class ForgetpwPage {

  constructor(public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    public navParams: NavParams) {

  }

  gotoVerify(){
      this.navCtrl.push(VerifyPage);
      let prompt = this.alertCtrl.create({
        title: 'Thank You!',
        subTitle: 'Please check your email with further instructions on resetting your password.',
        buttons: [
          {
            text: 'OK',
            handler: data =>{
              console.log('OK clicked')
            }
          }
        ]
      });prompt.present();
  }

  gotoVerifyUser(email: any){
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }
  
  // back(){
  //   this.navCtrl.push(LoginPage);
  // }

  // sendemail(user:User){
  //   let alert = this.alertCtrl.create({
  //     title: 'Thank You!',
  //     subTitle: 'Please check your email with further instructions on resetting your password.',
  //     buttons: ['Ok']
  //   });

  //   alert.present();

  //   this.afAuth.auth.sendPasswordResetEmail(user.email)
  //   .then(auth => {
  //     this.navCtrl.setRoot(LoginPage);
  //   })
  //   .catch(err => {
  //     let alert = this.alertCtrl.create({
  //       title: 'Error',
  //       message: err.message,
  //       buttons: ['OK']
  //     });
  //     alert.present();;
  //   });
  // }
}