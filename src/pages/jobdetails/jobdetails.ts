import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { addJob } from '../../models/addJob.model';
import { JobService } from '../../services/JobService';

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
    private JobService: JobService) {
  }

  ngOnInit(){
    this.job = this.navParams.get('job');
  }

}
