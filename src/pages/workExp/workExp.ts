import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'page-workExp',
  templateUrl: 'workExp.html'
})
export class WorkExperiencePage {
workexp = {} as WorkExperiencePage;

  workForm: FormGroup;
  organizationName: AbstractControl;
  titlePost: AbstractControl;
  reasonLeaving: AbstractControl;
  refereeName: AbstractControl;
  refereeNumber: AbstractControl;
  WorkExperiencePage: unknown;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formbuilder: FormBuilder,
    private afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase) {
      
      this.workForm = formbuilder.group({
        organizationName: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]*$')])],
        titlePost: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]*$')])],
        reasonLeaving: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]*$')])],
        refereeName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z\'@ ]+')])],
        refereeNumber: ['', Validators.compose([Validators.required, Validators.maxLength(7)])],
      });

      this.organizationName = this.workForm.controls['organizationName'];
      this.titlePost = this.workForm.controls['titlePost'];
      this.reasonLeaving = this.workForm.controls['reasonLeaving'];
      this.refereeName = this.workForm.controls['refereeName'];
      this.refereeNumber = this.workForm.controls['refereeNumber'];
  }
  gotoLogin(){
    // this.navCtrl.push(LoginPage);
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`workExp/${auth.uid}`).set(this.WorkExperiencePage)
       .then(() => this.navCtrl.setRoot(LoginPage))
   });
  }
}