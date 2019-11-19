import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-notification',
  templateUrl: 'view-notification.html',
})
export class ViewNotificationPage {

  notification = {} as Notification;

  data = {
    location:'',
    date:'',
    time:'' 
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewNotificationPage');
  }

  getNotified(notification: Notification){
    return this.data;
  }

}
