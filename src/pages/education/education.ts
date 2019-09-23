import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WorkExperiencePage } from '../workExp/workExp';
import { Education } from '../../models/education.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-education',
  templateUrl: 'education.html'
})
export class EducationPage {

  education = {} as Education;
  selectedFile: File = null;
  http: HttpClient;
  

  constructor(public navCtrl: NavController,private afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase) {

  }
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('gs://job-speak-5e1c6.appspot.com/', fd)
    .subscribe(res => {
      console.log(res);
    })
  }


  gotoWork(){
    this.navCtrl.push(WorkExperiencePage);
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`education/${auth.uid}`).set(this.education)
       .then(() => this.navCtrl.setRoot(WorkExperiencePage));
   })
 
  }

}