import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminDashboardPage } from '../admin-dashboard/admin-dashboard';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { database } from 'firebase';
import { Observable } from 'rxjs';
import { JobService } from '../../services/JobService';
import { addJob } from '../../models/addJob.model';

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
export class AddingJobPage implements OnInit {

  // addJobForm: FormGroup;

  // initializeForm(){
  //   this.addJobForm = new FormGroup({
  //     'job': new FormControl(null, Validators.required),
  //     'requirements': new FormControl(null, Validators.required),
  //     'descriptions': new FormControl(null, Validators.required),
  //     'salary': new FormControl(null, Validators.required),
  //     'availability': new FormControl(null, Validators.required)
  //   })
  // }

  // addingjob = {} as addingJob;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private jobService: JobService,
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
  }

  addJobForm: FormGroup;
  mode: string = 'New';
  job: addJob;
  jobKey: string;


  ngOnInit(){
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit')
    {
      this.job = this.navParams.get('job');
      this.jobKey = this.navParams.get('key');
    }
    this.initializeForm();
  }

  initializeForm() {
    let job = null;
    let requirements = null;
		let descriptions = null;
    let salary = null;
    let availability = null;

		if (this.mode == "Edit") {
      job = this.job.job;
      requirements = this.job.requirements;
			descriptions = this.job.descriptions;
      salary = this.job.salary;
      availability = this.job.availability;

		}

		this.addJobForm = new FormGroup({
      'job': new FormControl(null, Validators.required),
      'requirements': new FormControl(null, Validators.required),
			'descriptions': new FormControl(null, Validators.required),
      'salary': new FormControl(null, Validators.required),
      'availability': new FormControl(null, Validators.required),
		});
	}

  // ngOnInit(){
  //   this.initializeForm();
  // }

  // onSubmit(){
  //   console.log('Job:' + this.addJobForm.get('job').value);
  //   console.log('Requirements:' + this.addJobForm.get('requirements').value);
  //   console.log('Descriptions:' + this.addJobForm.get('descriptions').value);
  //   console.log('Salary:' + this.addJobForm.get('salary').value);
  //   console.log('Availability:' + this.addJobForm.get('availability').value);
  // }

  // onSubmit(){
  //   this.jobService.addJob(this.addJobForm.get('id').value, this.addJobForm.get('job').value, this.addJobForm.get('requirements').value, this.addJobForm.get('descriptions').value, this.addJobForm.get('salary').value, this.addJobForm.get('availability').value)
  //   .then(ref => {
  //     console.log(ref.key);
  //   })
  // }

  onSubmit(){
    if (this.mode == "Edit") {
      this.jobService.editJob(
        this.jobKey, 
        this.addJobForm.get('job').value, 
        this.addJobForm.get('requirements').value, 
        this.addJobForm.get('descriptions').value, 
        this.addJobForm.get('salary').value, 
        this.addJobForm.get('availability').value)
        .then(() => {
         this.addJobForm.reset();
         this.navCtrl.setRoot(AdminDashboardPage);
      });
    } else {
  
      this.jobService.addJob(
        this.addJobForm.get('job').value, 
        this.addJobForm.get('requirements').value, 
        this.addJobForm.get('descriptions').value, 
        this.addJobForm.get('salary').value, 
        this.addJobForm.get('availability').value)
          .then(ref => {
            this.addJobForm.reset();
            this.navCtrl.setRoot(AdminDashboardPage, { key: ref.key});
        });
      }
    
    }

 

  // addjob(AdminDashboardPage: AdminDashboardPage){
  //   console.log(AdminDashboardPage);
  // }

  // addjob(){
  // this.navCtrl.push(AdminDashboardPage);
  //   this.afAuth.authState.take(1).subscribe(auth => {
  //     this.afDatabase.object(`addingJob/${auth.uid}`).set(this.addingjob)
  //      .then(() => this.navCtrl.setRoot(AdminDashboardPage));
  //  })

  // }



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
