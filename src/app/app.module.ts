import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CONFIG } from './firebase.credentials';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SplashscreenPage } from '../pages/splashscreen/splashscreen';
import { ForgetpwPage } from '../pages/forgetpw/forgetpw';
import { SignupPage } from '../pages/signup/signup';
import { VerifyPage } from '../pages/verify/verify';
import { UserhomePage } from '../pages/userhome/userhome';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SplashscreenPage,
    ForgetpwPage,
    SignupPage,
    VerifyPage,
    UserhomePage
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    UserhomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
