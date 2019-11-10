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
import { PersonalInfo } from '../../models/personalInfo.model';
import { appliedJob } from '../../models/appliedJob.model';
import { Education } from '../../models/education.model';
import { WorkExperience } from '../../models/workExperience.model';

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
  personalInfo: PersonalInfo;
  applied = {} as appliedJob;
  education: Education;
  workexp: WorkExperience;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private JobService: JobService,
    private alertCtrl: AlertController) {

  }

  ngOnInit(){
    this.job = this.navParams.get('job');

    this.getAuthenticatedUserProfile().subscribe(personalInfo => {
      this.personalInfo = <PersonalInfo>personalInfo;
    });
  }

  getAuthenticatedUserProfile(){
    return this.afAuth.authState
    .map(user => user.uid)
    .mergeMap(authId => this.afDatabase.object(`personalInfo/${authId}`).valueChanges())
    .take(1)
  }

  appliedJob(){
      const data = this.personalInfo;
      const job = this.job;
      var jobId = this.job.id;

      const jobs = this.afDatabase.object(`appliedJob/${jobId}`)
      jobs.update(job);

      this.afAuth.authState.take(1).subscribe(auth=> {
        const users = this.afDatabase.object(`appliedJob/${jobId}/users/${auth.uid}`)
        users.update(data);
      })

      // const data = this.personalInfo;
      // const job = this.job;
      // var jobId = this.job.id;

      // this.afAuth.authState.take(1).subscribe(auth => {
      //   const users = this.afDatabase.object(`appliedJob/${auth.uid}`)
      //   users.update(data)
      // })

      // this.afAuth.authState.take(1).subscribe(auth => {
      //   const jobs = this.afDatabase.object(`appliedJob/${auth.uid}/applied/${jobId}`)
      //   jobs.update(job)
      // })

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
