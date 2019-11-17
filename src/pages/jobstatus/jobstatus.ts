import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { appliedJob } from '../../models/appliedJob.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { addJob } from '../../models/addJob.model';

/**
 * Generated class for the JobstatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jobstatus',
  templateUrl: 'jobstatus.html',
})
export class JobstatusPage implements OnInit {

  history: addJob;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public afDatabase: AngularFireDatabase) {
  }

  ngOnInit(){
    this.history = this.navParams.get('history');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobstatusPage');
  }

}
