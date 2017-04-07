import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TimerConfig } from '../pages/timer/timer-config';
/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {
  private timers:Array<TimerConfig>;

  defaultTimers():Array<TimerConfig> {
    let t:Array<TimerConfig> = [];
    t.push(TimerConfig.newInstance("Standing Stake",   3, 300, 10, false, "#603060"));
    t.push(TimerConfig.newInstance("Streaches",        8,  60, 10, true , "#603030"));
    t.push(TimerConfig.newInstance("Tame the Tiger",   4,  30, 10, true , "#606030"));
    t.push(TimerConfig.newInstance("5 Mins",           1, 300, 10, false, "#306060"));
    return t;
  }

  constructor(public storage: Storage){
    
    this.timers = this.defaultTimers();
    let newData = JSON.stringify(this.timers);
    this.storage.set('timers', newData);
    this.timers.forEach((v,i) => {
      TimerConfig.show("Data:Init", v);
    }); /* */

    this.storage.get('timers').then((storedData) => {
      if(storedData) {
        TimerConfig.show("Raw:From Store", storedData);
        let t = JSON.parse(storedData);
        this.timers = [];
        t.forEach((v,i) => {
          this.timers.push(new TimerConfig(v));
        });
        this.timers.forEach((v,i) => {
          TimerConfig.show("Data:From Store", v);
        });
      } else {
        this.timers = this.defaultTimers();
        let newData = JSON.stringify(this.timers);
        this.storage.set('timers', newData);
      }
    });
    
  }
 
  getTimers() {
    return this.timers;  
  }
 
  saveTimers(data) {
    let newData = JSON.stringify(data);
    this.storage.set('timers', newData);
  }
}