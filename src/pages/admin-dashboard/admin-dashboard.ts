import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AddingJobPage } from '../adding-job/adding-job';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import { DataService } from '../../services/data.service';
import { ActionSheetService } from '../../services/action-sheet.service';
import { JobService } from '../../services/JobService';
import { addJob } from '../../models/addJob.model';
import { AdminJobDetailsPage } from '../admin-jobdetails/admin-jobdetails';


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
export class AdminDashboardPage implements OnInit {

  addingJob: Observable<addJob[]>;

// rootPage: any = AdminDashboardPage;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private JobService: JobService,
    private afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase,
    private data: DataService,
    private actionSheet: ActionSheetService,
    private events: Events) {  
  }

  addJob(){
    this.navCtrl.push(AddingJobPage, { mode: 'New' });
  }

  ngOnInit(){
    this.addingJob = this.JobService.getJob().snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key,
        ...c.payload.val()
      }));
    });
  }

  loadDetails(job: addJob){
    this.navCtrl.push(AdminJobDetailsPage, {job: job});
  }

  // loadDetails(){
  //   this.navCtrl.push(AdminJobDetailsPage);
  // }
  
}
