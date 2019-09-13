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
    JoblistPage
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
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
    JoblistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
