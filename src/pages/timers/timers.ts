import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Timers } from '../../providers/timers/timers';
import { TimerPage } from '../timer/timer';
import { TimerConfigPage } from '../timer-config/timer-config'

@Component({
  selector: 'page-timers',
  templateUrl: 'timers.html'
})
export class TimersPage {

  constructor(
    public navCtrl: NavController,
      public navParams: NavParams,
      public alertCtrl: AlertController,
      public timers: Timers) {}

  getTimers() {
    return this.timers.getAll();
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
      this.timers.add(data.timer); 
      let i = this.timers.getAll().length;
      this.navCtrl.push(TimerConfigPage, { timer: i-1, new: true });
    } });
    alert.present();    
  }

  openTimerPage(index) {
    this.navCtrl.push(TimerPage, { timer: index });
  }

}
