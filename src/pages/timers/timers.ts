import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Data } from '../../providers/data';
import { TimerPage } from '../timer/timer';
/*
  Generated class for the Config page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-timers',
  templateUrl: 'timers.html'
})
export class TimersPage {

  constructor(
    public navCtrl: NavController,
      public navParams: NavParams,
      public alertCtrl: AlertController,
      public dataService: Data) {}

  getTimers() {
    return this.dataService.getTimers();
  }

  ionViewDidLoad() {
  }

  getLogo(i: number) : string {
    let idx = (i%4)+1;
    return "assets/img/stance"+idx.toString()+".png";
  }
  
  addTimer() {
    let alert = this.alertCtrl.create({
        title: 'New Timer?',
        message: 'Enter the name of the new timer.'
      });
    alert.addInput({name: 'timer', placeholder: 'Timer'});
    alert.addButton({ text: 'Cancel', role: 'cancel', handler: data => { } });
    alert.addButton({ text: 'Save', handler: data => { 
      this.dataService.addTimer(data.timer); 
      let i = this.dataService.getTimers().length;
      this.navCtrl.push(TimerPage, { timer: i-1, new: true });
    } });
    alert.present();    
  }

  openTimerPage(index) {
    this.navCtrl.push(TimerPage, { timer: index, new: false });
  }

}
