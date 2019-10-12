import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
    private alertCtrl: AlertController,
    private jobService: JobService) {

  }

  ngOnInit(){
      this.job = this.navParams.get("job");
  }

  onEditJob(key: string){
      this.navCtrl.push(AddingJobPage, { mode: 'Edit', key: key, job: this.job});
  }

  onDeleteJob(key: string){
      const confirm = this.alertCtrl.create({
        title: 'Delete job',
        message: 'Confirm to delete job?',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('No clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              console.log('Yes clicked');
              this.navCtrl.push(AdminDashboardPage);
              this.jobService.deleteJob(key);
            }
          }
        ]
      });
      confirm.present();
  }

}