import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { addJob } from '../../models/addJob.model';
import { JobService } from '../../services/JobService';
import { JoblistPage } from '../joblist/joblist';
import { UserhomePage } from '../userhome/userhome';

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
export class JobdetailsPage {

  addingJob: Observable<addJob[]>;
  job: addJob[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private JobService: JobService) {
  }

  ngOnInit(){
    this.job = this.navParams.get('job');
  }

  appliedJob(){
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
