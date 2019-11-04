import { Component, ElementRef, ViewChild,Renderer  } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams, Searchbar } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { JobService } from '../../services/JobService';
import { addJob } from '../../models/addJob.model';
import { UserhomePage } from '../userhome/userhome';
import { JobdetailsPage } from '../jobdetails/jobdetails';
import { MyprofilePage } from '../myprofile/myprofile';

/**
 * Generated class for the JoblistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-joblist',
  templateUrl: 'joblist.html',
})
export class JoblistPage {
  // @ViewChild('searchbar', { read: ElementRef }) searchbarRef: ElementRef;
  // @ViewChild('searchbar') searchbarElement: Searchbar;
  // search: boolean  = false;
  // queryText: string;

  addingJob: Observable<addJob[]>;

  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    private JobService: JobService) {
  }
  // toggleSearch() {
  //   if (this.search) {
  //     this.search = false;
  //   } else {
  //     this.search = true;
  //     this.searchbarElement.setFocus();
  //   }
  // }

  // searchAction(texto: any) {
  //   let val = texto.target.value;
  //   //implement search
  // }

  ngOnInit(){
    this.addingJob = this.JobService.getJob().snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key,
        ...c.payload.val()
      }));
    });
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

  loadJob(job: addJob){
    this.navCtrl.push(JobdetailsPage, {job: job});
  }


}
