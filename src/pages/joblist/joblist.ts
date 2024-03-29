import { Component, ElementRef, ViewChild,Renderer, OnInit  } from '@angular/core';
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
import { AngularFireAuth } from 'angularfire2/auth';
import { Education } from '../../models/education.model';
import { map } from 'rxjs-compat/operator/map';
import firebase from 'firebase';

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
export class JoblistPage implements OnInit {
  // @ViewChild('searchbar', { read: ElementRef }) searchbarRef: ElementRef;
  // @ViewChild('searchbar') searchbarElement: Searchbar;
  // search: boolean  = false;
  // queryText: string;

  addingJob: Observable<addJob[]>;
  education: Education;
  // searchTerm = '';
  // education: any;
  // Oresult: any;
  // Hcourse: any;
  // Dcourse: any;
  // doc: '';
  public jobList:Array<any>;
  public loadedJobList:Array<any>;
  public jobRef:firebase.database.Reference;


  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    private JobService: JobService,
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
      this.jobRef = firebase.database().ref('/addJob');
      this.jobRef.on('value', jobList => {
        let jobs = [];
        jobList.forEach(job =>{
          jobs.push (job.val());
          return false;
        });
        this.jobList = jobs;
        this.loadedJobList = jobs;
      });
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
  initializeItems(){
    this.jobList = this.loadedJobList;
  }
  getItems(searchbar){
    this.initializeItems();
    var q = searchbar.srcElement.value;
    if(!q){
      return
    }
    this.jobList = this.jobList.filter((v)=>{
      if(v.title && q){
        if(v.title.toLowerCase().indexOf(q.toLowerCase()) > -1){
          return true;
        }
        return false;
      }
  });
  console.log(q, this.jobList.length);
}

  ngOnInit(){
    this.addingJob = this.JobService.getJob().snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key,
        ...c.payload.val()
      }));
    });
    this.getEducation().subscribe(education => {
      this.education = <Education>education;
    });
  }

  getEducation(){
    return this.afAuth.authState
    .map(user => user.uid)
    .mergeMap(authId => this.afDatabase.object(`education/${authId}`).valueChanges())
    .take(1)
  }
  
  // search($event){
  //   let searchTerm: string= $event.target.value;
  //   let firstLetter = searchTerm.toUpperCase();
  //   if(this.Oresult > 0){
  //     this.afDatabase.list('addJob', ref => ref.orderByChild('title').equalTo(firstLetter)).snapshotChanges().subscribe
  //     ();
  //   }
  //   else{
  //     console.log('No Result Found');
  //   }
  // }
  
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
