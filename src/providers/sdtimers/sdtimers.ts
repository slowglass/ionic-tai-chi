import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SDTimerConfig} from './config'

@Injectable()
export class SDTimers {
  private timers:Array<SDTimerConfig>;

  constructor(public storage: Storage) {
    this.storage.get('sd-timers').then((storedData) => {
      if(storedData) {
        let t = JSON.parse(storedData);
        this.timers = [];
        t.forEach((v,i) => {
          this.timers.push(new SDTimerConfig(v));
        });
        this.timers.forEach((v,i) => {
        });
      }
    });
    
  }
 
  add(name: string) {
    let size=this.timers.length;
    this.timers.push(SDTimerConfig.newInstance(name, size, 300, 10, "#603060", 5));
    this.save();
  }

  getAll() {
    return this.timers;  
  }

  get(index: number) {
    return this.timers[index];  
  }

  set(index: number, timer: SDTimerConfig) {
    this.timers[index] = timer;
    this.save();
  }

  remove(index: number) {
     this.timers.splice(index, 1);
    this.save();
  }
 
  save() {
    let newData = JSON.stringify(this.timers);
    this.storage.set('sd-timers', newData);
  }
}