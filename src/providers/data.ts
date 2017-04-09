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
    t.push(TimerConfig.newInstance("Standing Stake",   0, 3, 300, 10, false, "#603060"));
    t.push(TimerConfig.newInstance("Stretching",       1, 8,  60, 10, true , "#603030"));
    return t;
  }

  constructor(public storage: Storage) {
    this.storage.get('timers').then((storedData) => {
      if(storedData) {
        let t = JSON.parse(storedData);
        this.timers = [];
        t.forEach((v,i) => {
          this.timers.push(new TimerConfig(v));
        });
        this.timers.forEach((v,i) => {
        });
      } else {
        this.timers = this.defaultTimers();
        this.saveTimers();
      }
    });
    
  }
 
  addTimer(name: string) {
    let size=this.timers.length;
    this.timers.push(TimerConfig.newInstance(name, size, 1, 300, 10, false, "#603060"));
    this.saveTimers();
  }

  getTimers() {
    return this.timers;  
  }

  getTimer(index: number) {
    return this.timers[index];  
  }

  setTimer(index: number, timer: TimerConfig) {
    this.timers[index] = timer;
    this.saveTimers();
  }

  deleteTimer(index: number) {
     this.timers.splice(index, 1);
    this.saveTimers();
  }
 
  saveTimers() {
    let newData = JSON.stringify(this.timers);
    this.storage.set('timers', newData);
  }
}