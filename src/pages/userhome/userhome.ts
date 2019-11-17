import { Component, OnInit } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams, ToastController  } from 'ionic-angular';
import { JoblistPage } from '../joblist/joblist';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { MyprofilePage } from '../myprofile/myprofile';
import { JobstatusPage } from '../jobstatus/jobstatus';
import { appliedJob } from '../../models/appliedJob.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ViewNotificationPage } from '../view-notification/view-notification';
import { applied } from '../../models/applied.model';

/**
 * Generated class for the UserhomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userhome',
  templateUrl: 'userhome.html',
})
export class UserhomePage implements OnInit {

  historyJob: Observable<applied[]>;

  constructor(public alertCtrl: AlertController,
    public afDatabase: AngularFireDatabase, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private afAuth: AngularFireAuth,
    private toast: ToastController) {
  }

  private historyRef = this.afDatabase.list<applied>('applied');

  ngOnInit(){
    this.historyJob = this.getHistory().snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key,
        ...c.payload.val()
      }));
    });
  }

  getHistory(){
    return this.historyRef;
  }

  loadDetails(history: applied){
    this.navCtrl.push(JobstatusPage, {history: history})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserhomePage');
    this.afAuth.authState.take(1).subscribe(data =>{
      if (data && data.email && data.email && data.uid){
        this.toast.create({
          message: `Welcome to JOBSPEAK!!! ${data.email}`,
          duration: 3000
        }).present();
      }
      else{
        this.toast.create({
          message: `Could not find authentication details.`,
          duration: 3000
        }).present();
      }
    })
  }

  gotoHome(){
    this.navCtrl.push(UserhomePage);
  }

  gotoJoblist(){
    this.navCtrl.push(JoblistPage);
  }

  gotoProfile(){
    this.navCtrl.push(MyprofilePage);
  }

  gotoJobstatus(){
    this.navCtrl.push(JobstatusPage);
  }

  gotoNotifications() {
    this.navCtrl.push(ViewNotificationPage);
  }
  
  doLogout() {
    const confirm = this.alertCtrl.create({
      title: 'Log Out',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Not Yet',
          handler: () => {
            console.log('Not Yet clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.navCtrl.push(LoginPage);
          }
        }
      ]
    });
    confirm.present();
  }

}
