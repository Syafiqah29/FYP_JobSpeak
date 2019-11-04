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
    let id = null;
    let title = null;
    let company = null;
    let address = null;
    let contact = null;
    let requirements = null;
    let age = null;
    let gender = null;
		let descriptions = null;
    let salary = null;
    let availability = null;
    let date = null;

		if (this.mode == "Edit") {
      id = this.job.id;
      title = this.job.title;
      company = this.job.company;
      address = this.job.address;
      contact = this.job.contact;
      requirements = this.job.requirements;
      age = this.job.age;
      gender = this.job.gender;
			descriptions = this.job.descriptions;
      salary = this.job.salary;
      availability = this.job.availability;
      date = this.job.date;
		}

		this.addJobForm = new FormGroup({
      'id': new FormControl(null, Validators.required),
      'company': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'contact': new FormControl(null, Validators.required),
      'title': new FormControl(null, Validators.required),
      'requirements': new FormControl(null, Validators.required),
      'age': new FormControl(null, Validators.required),
      'gender': new FormControl(null, Validators.required),
			'descriptions': new FormControl(null, Validators.required),
      'salary': new FormControl(null, Validators.required),
      'availability': new FormControl(null, Validators.required),
      'date' : new FormControl(null, Validators.required)
		});
	}


  onSubmit(){
    if (this.mode == "Edit") {
      this.jobService.editJob(
        this.jobKey, 
        this.addJobForm.get('id').value,
        this.addJobForm.get('company').value, 
        this.addJobForm.get('address').value, 
        this.addJobForm.get('contact').value,
        this.addJobForm.get('title').value, 
        this.addJobForm.get('requirements').value, 
        this.addJobForm.get('age').value,
        this.addJobForm.get('gender').value,
        this.addJobForm.get('descriptions').value, 
        this.addJobForm.get('salary').value, 
        this.addJobForm.get('availability').value,
        this.addJobForm.get('date').value)
        .then(() => {
         this.addJobForm.reset();
         this.navCtrl.setRoot(AdminDashboardPage);
      });
    } else {
  
      this.jobService.addJob(
        this.addJobForm.get('id').value,
        this.addJobForm.get('company').value, 
        this.addJobForm.get('address').value, 
        this.addJobForm.get('contact').value,
        this.addJobForm.get('title').value, 
        this.addJobForm.get('requirements').value, 
        this.addJobForm.get('age').value,
        this.addJobForm.get('gender').value,
        this.addJobForm.get('descriptions').value, 
        this.addJobForm.get('salary').value, 
        this.addJobForm.get('availability').value,
        this.addJobForm.get('date').value)
          .then(ref => {
            this.addJobForm.reset();
            this.navCtrl.setRoot(AdminDashboardPage, { key: ref.key});
        });
      }
    
    }

}