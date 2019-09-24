import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddingJobPage } from '../adding-job/adding-job';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
// import { Observable } from 'rxjs';
import { addingJob } from '../../models/addingJob.model';


/**  
 * Generated class for the AdminDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-dashboard',
  templateUrl: 'admin-dashboard.html',
})
export class AdminDashboardPage {

// rootPage: any = AdminDashboardPage;



  constructor(public navCtrl: NavController, public navParams: NavParams,private afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase) {
  
     
    }

  navigatetoaddingjobpage(){
    this.navCtrl.push(AddingJobPage);
  }

}
