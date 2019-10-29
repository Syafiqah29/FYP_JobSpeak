import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WorkExperiencePage } from '../workExp/workExp';
import { Education } from '../../models/education.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { storage, initializeApp } from 'firebase'
import { FIREBASE_CONFIG } from '../../app/app.firebase.config';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'page-education',
  templateUrl: 'education.html'
})
export class EducationPage {

  education = {} as Education;

  constructor(public navCtrl: NavController,
    private camera: Camera,
    private afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase) {
      // initializeApp(FIREBASE_CONFIG);

  }

  async OtakePhoto(){
    try{
    const options: CameraOptions = {
      quality: 50,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
  
    const result = await this.camera.getPicture(options);

    const image = `data:image/jpeg;base64,${result}`;

    const pictures = storage().ref('OLevel/pictures');
    pictures.putString(image, 'data_url');


  }
  catch (e){
    console.error(e);
  }
}

async AtakePhoto(){
  try{
  const options: CameraOptions = {
    quality: 50,
    targetHeight: 600,
    targetWidth: 600,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

  const result = await this.camera.getPicture(options);

  const image = `data:image/jpeg;base64,${result}`;

  const pictures = storage().ref('ALevel/pictures');
  pictures.putString(image, 'data_url');


}
catch (e){
  console.error(e);
}
}

async NtakePhoto(){
  try{
  const options: CameraOptions = {
    quality: 50,
    targetHeight: 600,
    targetWidth: 600,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

  const result = await this.camera.getPicture(options);

  const image = `data:image/jpeg;base64,${result}`;

  const pictures = storage().ref('ND/pictures');
  pictures.putString(image, 'data_url');


}
catch (e){
  console.error(e);
}
}

async HtakePhoto(){
  try{
  const options: CameraOptions = {
    quality: 50,
    targetHeight: 600,
    targetWidth: 600,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

  const result = await this.camera.getPicture(options);

  const image = `data:image/jpeg;base64,${result}`;

  const pictures = storage().ref('HND/pictures');
  pictures.putString(image, 'data_url');


}
catch (e){
  console.error(e);
}
}

async DtakePhoto(){
  try{
  const options: CameraOptions = {
    quality: 50,
    targetHeight: 600,
    targetWidth: 600,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

  const result = await this.camera.getPicture(options);

  const image = `data:image/jpeg;base64,${result}`;

  const pictures = storage().ref('Degree/pictures');
  pictures.putString(image, 'data_url');


}
catch (e){
  console.error(e);
}
}

async MtakePhoto(){
  try{
  const options: CameraOptions = {
    quality: 50,
    targetHeight: 600,
    targetWidth: 600,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

  const result = await this.camera.getPicture(options);

  const image = `data:image/jpeg;base64,${result}`;

  const pictures = storage().ref('Master/pictures');
  pictures.putString(image, 'data_url');


}
catch (e){
  console.error(e);
}
}

async PtakePhoto(){
  try{
  const options: CameraOptions = {
    quality: 50,
    targetHeight: 600,
    targetWidth: 600,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

  const result = await this.camera.getPicture(options);

  const image = `data:image/jpeg;base64,${result}`;

  const pictures = storage().ref('PhD/pictures');
  pictures.putString(image, 'data_url');


}
catch (e){
  console.error(e);
}
}

  gotoWork(){
    this.navCtrl.push(WorkExperiencePage);
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`education/${auth.uid}`).set(this.education)
       .then(() => this.navCtrl.setRoot(WorkExperiencePage));
   })
 
  }
}
