import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { addingJob } from '../../models/addingJob.model';
import { AdminDashboardPage } from '../admin-dashboard/admin-dashboard';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';

/**
 * Generated class for the AddingJobPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adding-job',
  templateUrl: 'adding-job.html',
})
export class AddingJobPage {

  addJob = {} as addingJob;

  constructor(public navCtrl: NavController, public navParams: NavParams,private afDatabase: AngularFireDatabase
    ,private afAuth: AngularFireAuth) {
  }

 

  // addjob(AdminDashboardPage: AdminDashboardPage){
  //   console.log(AdminDashboardPage);
  // }

  addjob(){
  this.navCtrl.push(AdminDashboardPage);
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`job details/${auth.uid}`).set(this.addJob)
       .then(() => this.navCtrl.setRoot(AdminDashboardPage));
   })

  }

   ionViewDidLoad() {
    console.log('ionViewDidLoad AddingJobPage');
  }
}
