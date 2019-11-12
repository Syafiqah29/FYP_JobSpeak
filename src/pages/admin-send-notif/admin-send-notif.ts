import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AdminDashboardPage } from '../admin-dashboard/admin-dashboard';
import { AdminUserappliedPage } from '../admin-userapplied/admin-userapplied';

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

notification = {} as Notification;

  data = {
    location:'',
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

  notifSent(notification: Notification) {

    const notifConfirm = this.alertCtrl.create({
      title: 'Confirm send?',
      message: 'Located at ' + this.data.location + ' on ' + this.data.date + ' at ' + this.data.time,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            // this.navCtrl.push(AdminUserappliedPage);
            let notifSent = this.alertCtrl.create({
              title: 'Sent!',
              message: 'Located at ' + this.data.location + ' on ' + this.data.date + ' at ' + this.data.time,
              buttons: [
                {
                  text: 'Back to Applicants list',
                  handler: () => {
                    console.log('back to applicants list clicked');
                    this.navCtrl.push(AdminUserappliedPage);
                  }
                },
                {
                  text: 'Go to Dashboard',
                  handler: () => {
                    console.log('go to dashboard clicked');
                    this.navCtrl.push(AdminDashboardPage);
                  }
                }
              ]
            });
            notifSent.present();
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.navCtrl.push(AdminSendNotifPage);
          }
        }
      ]
    });
    notifConfirm.present();

    
  }

}
