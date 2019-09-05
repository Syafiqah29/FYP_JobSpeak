import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { PersonalInformationPage } from '../personalInfo/personalInfo';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  user = {} as User;

  accountForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  confirmPassword: AbstractControl;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formbuilder: FormBuilder,
    private afAuth: AngularFireAuth) {

      this.accountForm = formbuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Za-z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        password: ['', Validators.compose([Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*().-_]).{8,16})')])],
        confirmPassword: ['', Validators.compose([Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*().-_]).{8,16})')])]
      });

      this.email = this.accountForm.controls['email'];
      this.password = this.accountForm.controls['password'];
      this.confirmPassword = this.accountForm.controls['confirmPassword'];

  }
  async nextPage(user: User){
    this.navCtrl.push(PersonalInformationPage);
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);

    }
    catch(e){
      console.error(e);
    }
  }
}