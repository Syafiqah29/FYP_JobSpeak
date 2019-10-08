import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { addJob } from '../../models/addJob.model';
import { AddingJobPage } from '../adding-job/adding-job';
import { JobService } from '../../services/JobService';
import { AdminDashboardPage } from '../admin-dashboard/admin-dashboard';

@Component({
  selector: 'page-admin-jobdetails',
  templateUrl: 'admin-jobdetails.html'
})
export class AdminJobDetailsPage {

    job: addJob;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private jobService: JobService) {

  }

  ngOnInit(){
      this.job = this.navParams.get("job");
  }

  onEditJob(key: string){
      this.navCtrl.push(AddingJobPage, { mode: 'Edit', key: key, job: this.job});
  }

  onDeleteJob(key: string){
      this.jobService.deleteJob(key);
      this.navCtrl.push(AdminDashboardPage);
  }

}