import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Timers } from '../../providers/timers/timers';
import { TimerPage } from '../timer/timer';
import { TimerConfigPage } from '../timer-config/timer-config'
import { Utils } from '../../libs/utils'
import { ItemSliding } from 'ionic-angular';
import { List } from 'ionic-angular';

@Component({
  selector: 'page-timers',
  templateUrl: 'timers.html'
})
export class TimersPage {

  private onSlideFired:boolean = false;
  @ViewChild(List) list: List;

  constructor(
    public navCtrl: NavController,
      public navParams: NavParams,
      public alertCtrl: AlertController,
      public timers: Timers) {}

  ionViewWillEnter() {
    this.onSlideFired = false;
    this.list.closeSlidingItems();
  }

  getTimers() { return this.timers.getAll(); }

  getLogo(i: number): string { return Utils.getLogo(i); }
  getDurationAsString(d: any): string { return Utils.getDurationAsString(d); }

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

  onDrag($event:ItemSliding, idx) {
    let slidingPercent = $event.getSlidingPercent();
    if(Math.abs(slidingPercent) < 1.7 || this.onSlideFired)
      return;
    
    $event.close();
    if (this.onSlideFired) return;
    this.onSlideFired = true;
    if (slidingPercent > 0)
      this.removeTimer(idx);
    else
      this.configTimer(idx);
  }

  openTimerPage(idx:number) {
    this.navCtrl.push(TimerPage, { timer: idx });
  }

  removeTimer(idx: number) {
    this.timers.remove(idx);
  }

  configTimer(idx:number) {
    this.navCtrl.push(TimerConfigPage, { timer: idx, new: false });
  }

}
