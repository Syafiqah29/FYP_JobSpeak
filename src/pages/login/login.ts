import { Component } from '@angular/core';
import { NavController, AlertController, NavParams  } from 'ionic-angular';
import { ForgetpwPage } from '../forgetpw/forgetpw';
import { SignupPage } from '../signup/signup';
import { UserhomePage } from '../userhome/userhome';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import { AdminDashboardPage } from '../admin-dashboard/admin-dashboard';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user = {} as User;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, 
    private alertCtrl: AlertController,
    public navParams: NavParams){}
 
  // login(user:User){
  //   this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password)
  //   .then(auth => {
  //     this.navCtrl.setRoot(UserhomePage);
  //   })
  //   .catch(err => {
  //     // Handle error
  //     let alert = this.alertCtrl.create({
  //       title: 'Error',
  //       message: err.message,
  //       buttons: ['OK']
  //     });
  //     alert.present();;
  //   });
  // }

  gotoForgetpw(){
    this.navCtrl.push(ForgetpwPage);
  }
  
  gotoSignup(){
    this.navCtrl.push(SignupPage);
  }

  async gotoUser(user: User){

    //Line 50 - 61 : Coding for user stay logged in. Uncomment if necessary.

    // this.afAuth.auth.onAuthStateChanged(
    //     user => {
    //       if (user) {
    //         this.navCtrl.push(UserhomePage); //User is already signed in.
    //       } else {
    //         this.navCtrl.push(LoginPage); //No user signed in.
    //       }
    //     },
    //     () => {
    //       this.navCtrl.push(LoginPage);
    //     }
    //   );

  try {
    const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
    if (result){
      this.navCtrl.setRoot(UserhomePage);
    }
  }
  catch(e){
    let prompt = this.alertCtrl.create({
      title: 'Error',
      message: e.message,
      buttons:[
        {
          text: 'OK',
          handler: data => {
            console.log('OK clicked')
          }
        }
      ]
    });prompt.present();
    console.error(e);
  }
  finally {
    if (user.email == "jobspeak.dev@gmail.com" && user.password == "Jobspeak@2019") {
      this.navCtrl.push(AdminDashboardPage);
    }
  }
}
}