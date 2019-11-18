import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WorkExperiencePage } from '../workExp/workExp';
import { Education } from '../../models/education.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { storage, initializeApp } from 'firebase'
import { FIREBASE_CONFIG } from '../../app/app.firebase.config';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-education',
  templateUrl: 'education.html'
})
export class EducationPage {

  education = {} as Education;

  // TRYOUT 18/11
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    cameraDirection:0
  }

  OImage: any;
  HImage: any;
  DImage: any;
  // TRYOUT 18/11

  constructor(public navCtrl: NavController,
    private camera: Camera,
    private afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase) {
      // initializeApp(FIREBASE_CONFIG);

  }

  // TRYOUT 18/11
  // O Level
  OclickImage(){
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64ImageO = 'data:image/jpeg;base64,' + imageData;
      this.OImage = 'data:image/jpeg;base64,' + imageData;

      const pictures = storage().ref('OLevel/photo');
      pictures.putString(base64ImageO, 'data_url');

     }, (err) => {
      // Handle error
     });
  }

  // HND
  HclickImage(){
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64ImageH = 'data:image/jpeg;base64,' + imageData;
      this.HImage = 'data:image/jpeg;base64,' + imageData;
    
      const pictures = storage().ref('HND/photo');
      pictures.putString(base64ImageH, 'data_url');

     }, (err) => {
      // Handle error
     });
  }

  // Degree
  DclickImage(){
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64ImageD = 'data:image/jpeg;base64,' + imageData;
      this.DImage = 'data:image/jpeg;base64,' + imageData;
      
      const pictures = storage().ref('Degree/photo');
      pictures.putString(base64ImageD, 'data_url');

     }, (err) => {
      // Handle error
     });
  }
  // TRYOUT 18/11

//   async OtakePhoto(){
//     try{
//     const options: CameraOptions = {
//       quality: 50,
//       targetHeight: 600,
//       targetWidth: 600,
//       destinationType: this.camera.DestinationType.DATA_URL,
//       encodingType: this.camera.EncodingType.JPEG,
//       mediaType: this.camera.MediaType.PICTURE,
//       correctOrientation: true
//     }
  
//     const result = await this.camera.getPicture(options);

//     const image = `data:image/jpeg;base64,${result}`;

//     const pictures = storage().ref('OLevel/pictures');
//     pictures.putString(image, 'data_url');


//   }
//   catch (e){
//     console.error(e);
//   }
// }

// async HtakePhoto(){
//   try{
//   const options: CameraOptions = {
//     quality: 50,
//     targetHeight: 600,
//     targetWidth: 600,
//     destinationType: this.camera.DestinationType.DATA_URL,
//     encodingType: this.camera.EncodingType.JPEG,
//     mediaType: this.camera.MediaType.PICTURE,
//     correctOrientation: true
//   }

//   const result = await this.camera.getPicture(options);

//   const image = `data:image/jpeg;base64,${result}`;

//   const pictures = storage().ref('HND/pictures');
//   pictures.putString(image, 'data_url');


// }
// catch (e){
//   console.error(e);
// }
// }

// async DtakePhoto(){
//   try{
//   const options: CameraOptions = {
//     quality: 50,
//     targetHeight: 600,
//     targetWidth: 600,
//     destinationType: this.camera.DestinationType.DATA_URL,
//     encodingType: this.camera.EncodingType.JPEG,
//     mediaType: this.camera.MediaType.PICTURE,
//     correctOrientation: true
//   }

//   const result = await this.camera.getPicture(options);

//   const image = `data:image/jpeg;base64,${result}`;

//   const pictures = storage().ref('Degree/pictures');
//   pictures.putString(image, 'data_url');


// }
// catch (e){
//   console.error(e);
// }
// }

  gotoWork(education: Education){
    this.navCtrl.push(WorkExperiencePage);
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`education/${auth.uid}`).set(this.education)
       .then(() => this.navCtrl.setRoot(WorkExperiencePage));
   })
 
  }
}
