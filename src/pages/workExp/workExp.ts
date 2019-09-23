import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { WorkExperience } from '../../models/workExperience.model';


@Component({
  selector: 'page-workExp',
  templateUrl: 'workExp.html'
})
export class WorkExperiencePage {
workexp = {} as WorkExperience;

  workForm: FormGroup;
  organizationName: AbstractControl;
  titlePost: AbstractControl;
  reasonLeaving: AbstractControl;
  refereeName: AbstractControl;
  refereeNumber: AbstractControl;
  year: AbstractControl;
  year2: AbstractControl;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formbuilder: FormBuilder,
    private afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase,
    public viewCtrl: ViewController) {
      
      this.workForm = formbuilder.group({
        organizationName: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]*$')])],
        titlePost: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]*$')])],
        reasonLeaving: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
        refereeName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z\'@ ]+')])],
        refereeNumber: ['', Validators.compose([Validators.required, Validators.maxLength(7)])],
        year: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{4}$')])],
        year2: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{4}$')])],
      });

      this.organizationName = this.workForm.controls['organizationName'];
      this.titlePost = this.workForm.controls['titlePost'];
      this.reasonLeaving = this.workForm.controls['reasonLeaving'];
      this.refereeName = this.workForm.controls['refereeName'];
      this.refereeNumber = this.workForm.controls['refereeNumber'];
      this.year = this.workForm.controls['year'];
      this.year2 = this.workForm.controls['year2'];
  }
  gotoLogin(){
    // this.navCtrl.push(LoginPage);
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`workExp/${auth.uid}`).set(this.workexp)
       .then(() => this.navCtrl.setRoot(LoginPage))
   });

   this.afAuth.auth.currentUser.sendEmailVerification();
  }
  ionViewDidLoad(){
    console.log('ionViewDidLoad WorkExperiencePage')
  }

}