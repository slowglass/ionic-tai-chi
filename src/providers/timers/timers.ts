import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TimerConfig } from './config';

@Injectable()
export class Timers {
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
        this.save();
      }
    });
    
  }
 
  add(name: string) {
    let size=this.timers.length;
    this.timers.push(TimerConfig.newInstance(name, size, 1, 300, 10, false, "#603060"));
    this.save();
  }

  getAll() {
    return this.timers;  
  }

  get(index: number) {
    return this.timers[index];  
  }

  set(index: number, timer: TimerConfig) {
    this.timers[index] = timer;
    this.save();
  }

  remove(index: number) {
     this.timers.splice(index, 1);
    this.save();
  }
 
  save() {
    let newData = JSON.stringify(this.timers);
    this.storage.set('timers', newData);
  }
}