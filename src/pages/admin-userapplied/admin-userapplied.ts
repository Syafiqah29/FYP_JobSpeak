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

  adminUserApplied: Observable<userApplying[]>;
  
  personalInfo: PersonalInfo;
  education: Education;
  work: WorkExperience;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase,
    private data: DataService,
    private alertCtrl: AlertController,
    private actionSheet: ActionSheetService,
    private events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminUserappliedPage');
  }

  if(userApplying = 0){
    const confirm = this.alertCtrl.create({
      title: 'No user has applied yet',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('OK clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  ngOnInit(){
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

}

