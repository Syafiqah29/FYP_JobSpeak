import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AddingJobPage } from '../adding-job/adding-job';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import { addingJob } from '../../models/addingJob.model';
import { DataService } from '../../services/data.service';
import { ActionSheetService } from '../../services/action-sheet.service';


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

  private addingJob: Observable<addingJob[]>;

// rootPage: any = AdminDashboardPage;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase,
    private data: DataService,
    private actionSheet: ActionSheetService,
    private events: Events) {  
  }

  addJob(){
    this.navCtrl.push(AddingJobPage);
  }

  ngOnInit(){
    this.addingJob = this.afDatabase.list<addingJob>('addingJob').snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key,
        ...c.payload.val()
      }));
    });

    // this.events.subscribe('job:delete', selectedItem => {
    //   this.addingJob = this.data.removeItem(this.addingJob, selectedItem);
    // })
  }

  openActionSheet(selectedItem: addingJob){
    this.actionSheet.present(selectedItem);
  }
  

}
