import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  accountForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  personalForm: FormGroup;
  name: AbstractControl;
  icNumber: AbstractControl;
  address: AbstractControl;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formbuilder: FormBuilder) {

      this.accountForm = formbuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Za-z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        password: ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])]
      });

      this.email = this.accountForm.controls['email'];
      this.password = this.accountForm.controls['password'];

      this.personalForm = formbuilder.group({
        name: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        icNumber: ['', Validators.compose([Validators.required, Validators.maxLength(9), Validators.pattern('^[0-9]+-[0-9]')])],
        address: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      });

      this.name = this.personalForm.controls['name'];
      this.icNumber = this.personalForm.controls['icNumber'];
      this.address = this.personalForm.controls['address'];

  }
  gotoLogin(){
    this.navCtrl.push(LoginPage);
  }
}