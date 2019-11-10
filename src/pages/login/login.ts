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
  loggedIn: boolean;

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

  // gotoadmin(){
  //   this.navCtrl.push(AdminDashboardPage);
  // }

  async gotoUser(user: User){
    // this.navCtrl.push(UserhomePage);

    this.afAuth.auth.onAuthStateChanged((user) => {
    //   if (user.email !== "jobspeak.dev@gmail.com") {
    //   this.navCtrl.push(UserhomePage); //to the page where user navigates after login
    //   // User is signed in.
    // } else {
    //   this.navCtrl.push(LoginPage); // to the login page as user is not logged in
    //   // No user is signed in.
    // }

    if (user != null) {
      // User is logged in, use the user object for its info.
      this.loggedIn = true;
      // this.user = user.email;
  } else {
      this.navCtrl.push(LoginPage);// User is not logged in, redirect to where you need to.
  }
  });

    if (user.email == "jobspeak.dev@gmail.com" && user.password == "Jobspeak@2019") {
      this.navCtrl.push(AdminDashboardPage);
    }
    else {
      try {
        const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
        if (result){
          this.navCtrl.setRoot(UserhomePage);
        }
      } catch(e){
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
  }
}
}