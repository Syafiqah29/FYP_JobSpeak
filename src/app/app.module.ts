import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { HttpModule } from "@angular/http";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SplashscreenPage } from '../pages/splashscreen/splashscreen';
import { ForgetpwPage } from '../pages/forgetpw/forgetpw';
import { SignupPage } from '../pages/signup/signup';
import { VerifyPage } from '../pages/verify/verify';
import { UserhomePage } from '../pages/userhome/userhome';
import { ConfirmPasswordValidatorDirective } from '../pages/signup/confirmPasswordValidator.directive';
import { PersonalInformationPage } from '../pages/personalInfo/personalInfo';
import { EducationPage } from '../pages/education/education';
import { WorkExperiencePage } from '../pages/workExp/workExp';
import { JoblistPage } from '../pages/joblist/joblist';
import { JobdetailsPage } from '../pages/jobdetails/jobdetails';
import { AdminDashboardPage } from '../pages/admin-dashboard/admin-dashboard';
import { MyprofilePage } from '../pages/myprofile/myprofile';
import { AddingJobPage} from '../pages/adding-job/adding-job';

var config = {
  apiKey: "AIzaSyCxuQ8uROuUrMVHCj2i0RwDjUwlpo6VvVs",
  authDomain: "job-speak-5e1c6.firebaseapp.com",
  databaseURL: "https://job-speak-5e1c6.firebaseio.com",
  projectId: "job-speak-5e1c6",
  storageBucket: "job-speak-5e1c6.appspot.com",
  messagingSenderId: "347804093851",
  appId: "1:347804093851:web:7be1868ee9f70a94"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SplashscreenPage,
    ForgetpwPage,
    SignupPage,
    VerifyPage,
    UserhomePage,
    ConfirmPasswordValidatorDirective,
    PersonalInformationPage,
    EducationPage,
    WorkExperiencePage,
    JoblistPage,
    JobdetailsPage,
    AdminDashboardPage,
    MyprofilePage,
    AddingJobPage
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    HttpModule
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SplashscreenPage,
    ForgetpwPage,
    SignupPage,
    VerifyPage,
    UserhomePage,
    PersonalInformationPage,
    EducationPage,
    WorkExperiencePage,
    JoblistPage,
    JobdetailsPage,
    MyprofilePage,
    AdminDashboardPage,
    AddingJobPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
