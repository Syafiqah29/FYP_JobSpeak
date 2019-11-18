import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { applied } from '../../models/applied.model';
import 'rxjs/add/operator/map';

/**
 * Generated class for the AdminViewprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-viewprofile',
  templateUrl: 'admin-viewprofile.html',
})

export class AdminViewprofilePage implements OnInit {

  history: applied;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public afDatabase: AngularFireDatabase) {

  }

  ngOnInit(){
    this.history = this.navParams.get('history');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminViewprofilePage');
  }

}
