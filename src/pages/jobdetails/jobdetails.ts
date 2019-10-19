import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { addJob } from '../../models/addJob.model';
import { JobService } from '../../services/JobService';
import { JoblistPage } from '../joblist/joblist';
import { UserhomePage } from '../userhome/userhome';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the JobdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jobdetails',
  templateUrl: 'jobdetails.html',
})
export class JobdetailsPage implements OnInit {

  addingJob: Observable<addJob[]>;
  job: addJob[];
  userId: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private alertCtrl: AlertController,
    private JobService: JobService) {

      this.afAuth.authState.subscribe(user =>{
        if(user) this.userId = user.uid
      })
  }

  ngOnInit(){
    this.job = this.navParams.get('job');
  }


  appliedJob(addJobKey){

    this.JobService.appliedJob(addJobKey);

    this.navCtrl.push(JoblistPage);
    let prompt = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'You have successfully applied for this job',
      buttons: [
        {
          text: 'OK',
          handler: data => {
            console.log('OK clicked')
          }
        }
      ]
    });
    prompt.present();
  }

}
