import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

/**
 * Generated class for the AdminSendNotifPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-send-notif',
  templateUrl: 'admin-send-notif.html',
})
export class AdminSendNotifPage {

  data = { title:'',
          description:'',
          date:'',
          time:'' 
        };

  constructor(public navCtrl: NavController,
    public localNotifications: LocalNotifications,
  // public platform: Platform,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminSendNotifPage');
  }

  submit() {
    console.log(this.data);
    var date = new Date(this.data.date+" "+this.data.time);
    console.log(date);
    this.localNotifications.schedule({
       text: 'Click for your interview details',
      //  at: date,
       led: 'FF0000',
      //  sound: this.setSound(),
    });
    let alert = this.alertCtrl.create({
      title: 'Sent!',
      subTitle: 'Notification setup successful.',
      buttons: ['OK']
    });
    alert.present();
    this.data = { title:'', description:'', date:'', time:'' };
  }

}
