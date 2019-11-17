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
import { Education } from '../../models/education.model';
import { WorkExperience } from '../../models/workExperience.model';
import { applied } from '../../models/applied.model';

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
  job: addJob;
  userId: string;
  personalInfo: PersonalInfo;
  applied = {} as applied;
  education: Education;
  workexp: WorkExperience;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private alertCtrl: AlertController) {

  }

  ngOnInit(){
    this.job = this.navParams.get('job');

    this.getAuthenticatedUserProfile().subscribe(personalInfo => {
      this.personalInfo = <PersonalInfo>personalInfo;
    });

    this.getEducation().subscribe(education => {
      this.education = <Education>education;
    });

    this.getWork().subscribe(work => {
      this.workexp = <WorkExperience>work;
    });
  }

  getAuthenticatedUserProfile(){
    return this.afAuth.authState
    .map(user => user.uid)
    .mergeMap(authId => this.afDatabase.object(`personalInfo/${authId}`).valueChanges())
    .take(1)
  }

  getEducation(){
    return this.afAuth.authState
    .map(user => user.uid)
    .mergeMap(authId => this.afDatabase.object(`education/${authId}`).valueChanges())
    .take(1)
  }

  getWork(){
    return this.afAuth.authState
    .map(user => user.uid)
    .mergeMap(authId => this.afDatabase.object(`workExp/${authId}`).valueChanges())
    .take(1)
  }

  appliedJob(){
    // let key = this.afDatabase.list(`appliedJob/`).push({"company" : this.job.company}).key;

    let key = this.afDatabase.list(`applied/`).push({
      "company" : this.job.company,
      "companyAddress" : this.job.address,
      "companyContact" : this.job.contact,
      "jobTitle" : this.job.title,
      "jobStatus" : "Pending",
      "interviewDate" : "-",
      "interviewTime" : "-",
      "interviewLocation" : "-",
      "interviewInquiry" : "-",

      "name" : this.personalInfo.name1,
      "icNumber1" : this.personalInfo.icNumber1,
      "icNumber2" : this.personalInfo.icNumber3,
      "age" : this.personalInfo.age,
      "gender" : this.personalInfo.gender,
      "religion" : this.personalInfo.religion,
      "martialStatus" : this.personalInfo.martialStatus,
      "race" : this.personalInfo.race,
      "LClass" : this.personalInfo.LClass,
      "address" : this.personalInfo.address1,
      "phone" : this.personalInfo.phone,
      "relationship" : this.personalInfo.relationship,
      "Fname" : this.personalInfo.Fname1,
      "Fic1" : this.personalInfo.Fic1,
      "Fic2" : this.personalInfo.Fic2,
      "Fphone" : this.personalInfo.Fphone1,

      "Oschool" : this.education.Oschool,
      "Oresult" : this.education.Oresult,
      "Hschool" : this.education.Hschool,
      "Hcourse" : this.education.Hcourse,
      "Dschool" : this.education.Dschool,
      "Dcourse" : this.education.Dcourse,

      "workOrganization" : this.workexp.organization,
      "workPost" : this.workexp.post,
      "workYear1" : this.workexp.WorkYear,
      "workYear2" : this.workexp.WorkYear2,
      "workReason" : this.workexp.reason,
      "workReferee" : this.workexp.referee,
      "workReferee Number" : this.workexp.RefereeNumber,
      "workSkills" : this.workexp.skills,
    }).key;

      // this.afDatabase.object(`appliedJob/`).update({"company" : this.job.company});
      // this.afDatabase.object(`appliedJob/`).update({"company address" : this.job.address});
      // this.afDatabase.object(`appliedJob/`).update({"company contact" : this.job.contact});
      // this.afDatabase.object(`appliedJob/`).update({"job title" : this.job.title});

      // this.afDatabase.object(`appliedJob/`).update({"name" : this.personalInfo.name1});
      // this.afDatabase.object(`appliedJob/`).update({"icNumber1" : this.personalInfo.icNumber1});
      // this.afDatabase.object(`appliedJob/`).update({"icNumber2" : this.personalInfo.icNumber3});
      // this.afDatabase.object(`appliedJob/`).update({"age" : this.personalInfo.age});
      // this.afDatabase.object(`appliedJob/`).update({"gender" : this.personalInfo.gender});
      // this.afDatabase.object(`appliedJob/`).update({"religion" : this.personalInfo.religion});
      // this.afDatabase.object(`appliedJob/`).update({"martialStatus" : this.personalInfo.martialStatus});
      // this.afDatabase.object(`appliedJob/`).update({"race" : this.personalInfo.race});
      // this.afDatabase.object(`appliedJob/`).update({"DL" : this.personalInfo.DL});
      // this.afDatabase.object(`appliedJob/`).update({"LClass" : this.personalInfo.LClass});
      // this.afDatabase.object(`appliedJob/`).update({"address" : this.personalInfo.address1});
      // this.afDatabase.object(`appliedJob/`).update({"phone" : this.personalInfo.phone});
      // this.afDatabase.object(`appliedJob/`).update({"relationship" : this.personalInfo.relationship});
      // this.afDatabase.object(`appliedJob/`).update({"Fname" : this.personalInfo.Fname1});
      // this.afDatabase.object(`appliedJob/`).update({"Fic1" : this.personalInfo.Fic1});
      // this.afDatabase.object(`appliedJob/`).update({"Fic2" : this.personalInfo.Fic2});
      // this.afDatabase.object(`appliedJob/`).update({"Fphone" : this.personalInfo.Fphone1});

      // this.afDatabase.object(`appliedJob/${this.key}`).update({"Oschool" : this.education.Oschool});
      // this.afDatabase.object(`appliedJob/${this.key}`).update({"Oresult" : this.education.Oresult});
      // this.afDatabase.object(`appliedJob/${this.key}`).update({"Hschool" : this.education.Hschool});
      // this.afDatabase.object(`appliedJob/${this.key}`).update({"Hcourse" : this.education.Hcourse});
      // this.afDatabase.object(`appliedJob/${this.key}`).update({"Dschool" : this.education.Dschool});
      // this.afDatabase.object(`appliedJob/${this.key}`).update({"Dcourse" : this.education.Dcourse});

      // this.afDatabase.object(`appliedJob/${this.key}`).update({"work exp organization" : this.workexp.organization});
      // this.afDatabase.object(`appliedJob/${this.key}`).update({"work exp post" : this.workexp.post});
      // this.afDatabase.object(`appliedJob/${this.key}`).update({"work exp year1" : this.workexp.WorkYear});
      // this.afDatabase.object(`appliedJob/${this.key}`).update({"work exp year2" : this.workexp.WorkYear2});
      // this.afDatabase.object(`appliedJob/${this.key}`).update({"work exp reason" : this.workexp.reason});
      // this.afDatabase.object(`appliedJob/${this.key}`).update({"work exp referee" : this.workexp.referee});
      // this.afDatabase.object(`appliedJob/${this.key}`).update({"work exp referee number" : this.workexp.RefereeNumber});
      // this.afDatabase.object(`appliedJob/${this.key}`).update({"work exp skills" : this.workexp.skills});

      // const data = this.personalInfo;
      // const job = this.job;
      // var jobId = this.job.id;

      // const jobs = this.afDatabase.object(`appliedJob/${jobId}`)
      // jobs.update(job);

      // this.afAuth.authState.take(1).subscribe(auth=> {
      //   const users = this.afDatabase.object(`appliedJob/${jobId}/users/${auth.uid}`)
      //   users.update(data);
      // })

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
