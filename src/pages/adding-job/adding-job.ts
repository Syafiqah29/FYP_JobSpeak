import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { addingJob } from '../../models/addingJob.model';
import { AdminDashboardPage } from '../admin-dashboard/admin-dashboard';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { FormGroup } from '@angular/forms';
import { database } from 'firebase';
import { Observable } from 'rxjs';

/**
 * Generated class for the AddingJobPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adding-job',
  templateUrl: 'adding-job.html',
})
export class AddingJobPage {


  addingjob = {} as addingJob;

  


  constructor(public navCtrl: NavController, public navParams: NavParams,private afDatabase: AngularFireDatabase
    ,private afAuth: AngularFireAuth) {
  }


 

  // addjob(AdminDashboardPage: AdminDashboardPage){
  //   console.log(AdminDashboardPage);
  // }

  addjob(){
  this.navCtrl.push(AdminDashboardPage);
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`addingJob/${auth.uid}`).set(this.addingjob)
       .then(() => this.navCtrl.setRoot(AdminDashboardPage));
   })

  }



}

// const jobform = document.querySelector ('#jobform');
// const db = database;


// function addjob(doc) {
 
//   let li = document.createElement('li');
//   let jobname = document.createElement('jobname');
//   let requirements = document.createElement('span');
//   let descriptions = document.createElement('span');
//   let salary = document.createElement('span');
//   let availability = document.createElement('span');

//   li.setAttribute('data-id', doc.id);
//   jobname.textContent = doc.data().jobname;
//   requirements.textContent = doc.data().requirements;
//   descriptions.textContent = doc.data().descriptions;
//   salary.textContent = doc.data().salary;
//   availability.textContent = doc.data().availability;

//   li.appendChild (jobname);
//   li.appendChild (requirements);
//   li.appendChild (descriptions);
//   li.appendChild (salary);
//   li.appendChild (availability);

//   jobform.appendChild(li);
  


// }
// this.db.collection('job details').get().then((snapshot) =>{
//   snapshot.docs.forEach(doc =>{
//     addjob(doc);
//   })
// })
