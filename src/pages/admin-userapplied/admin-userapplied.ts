import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataService } from '../../services/data.service';
import { ActionSheetService } from '../../services/action-sheet.service';
import { PersonalInfo } from '../../models/personalInfo.model';
import { Education } from '../../models/education.model';
import { WorkExperience } from '../../models/workExperience.model';
import { userApplying } from '../../models/user-applied.model';
import { appliedJob } from '../../models/appliedJob.model';
import { database } from 'firebase';
import { AdminSendNotifPage } from '../admin-send-notif/admin-send-notif';

/**
 * Generated class for the AdminUserappliedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-userapplied',
  templateUrl: 'admin-userapplied.html',
})
export class AdminUserappliedPage implements OnInit {

  // adminUserApplied: Observable<userApplying[]>;
  
  personalInfo: PersonalInfo;
  education: Education;
  work: WorkExperience;
  applied: appliedJob;
  appliedJob: Observable<any>;
  jobKey: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase) {

      this.jobKey = this.navParams.get("key");

      this.afAuth.authState.subscribe(data => {
        if(data && data.email && data.uid ) {
          var ref = database().ref(`appliedJob/${this.jobKey}/users/${data.uid}`);
          ref.once('value', (snap) => {
            console.log(snap.val());

            // var profName = snap.val().name1;
            // console.log(profName);

            const title = this.navParams.get("key");
            console.log(title);

            this.appliedJob = this.afDatabase.object(`appliedJob/` + title + `users`).valueChanges();
          })
        }
      })
  }

  private historyRef = this.afDatabase.list<appliedJob>('appliedJob');

  getHistory(){
    return this.historyRef;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminUserappliedPage');
  }

  ngOnInit(){
    this.appliedJob = this.getHistory().snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key,
        ...c.payload.val()
      }));
    })

    // this.getApplied().subscribe(appliedJob => {
    //   this.applied = <appliedJob>appliedJob;
    // })
    
    this.getAuthenticatedUserProfile().subscribe(personalInfo => {
      this.personalInfo = <PersonalInfo>personalInfo;
    });

    this.getEducation().subscribe(education => {
      this.education = <Education>education;
    });

    this.getWork().subscribe(work => {
      this.work = <WorkExperience>work;
    });
  }

  getApplied(){
    // return this.afAuth.authState
    // .map(user => user.uid)
    // .mergeMap(authId => this.afDatabase.object(`appliedJob/${jobId}/users/${authId}`).valueChanges())
    // .take(1)
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
  
sendNotification() {
  this.navCtrl.push(AdminSendNotifPage);
}

  // if(userApplying = 0){
  //   const confirm = this.alertCtrl.create({
  //     title: 'No user has applied yet',
  //     buttons: [
  //       {
  //         text: 'OK',
  //         handler: () => {
  //           console.log('OK clicked');
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }

}

