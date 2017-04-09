import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { TimerConfig } from '../timer/timer-config';

import { Data } from '../../providers/data';
/*
  Generated class for the TimerConfig page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-timer-config',
  templateUrl: 'timer-config.html'
})
export class TimerConfigPage {
  private timer: TimerConfig;
  private index: number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public dataService: Data) {
      this.timer = new TimerConfig();
    }
    
    deleteConfig() {
      let alert = this.alertCtrl.create({
          title: 'Delete timer',
          message: 'Do you wish to delete timer: '+this.timer.getLabel()
        });
        alert.addButton({ text: 'Yes', handler: data => { 
          this.dataService.deleteTimer(this.index); 
          this.index = -1;
          this.navCtrl.pop(); 
        } });
        alert.addButton({ text: 'No', handler: data => { }});
        alert.present();
    }
    ionViewDidLoad() {
      this.index = Number(this.navParams.get('index'));
      this.timer = new TimerConfig(this.dataService.getTimer(this.index));
      console.log("ionViewDidLoad Index: "+ this.index.toString());
      TimerConfig.show("ionViewDidLoad", this.timer);
    }

    ionViewCanLeave(): boolean | Promise<boolean> {
      if (this.index == -1) return true;
      if (this.timer.equals(this.dataService.getTimer(this.index))) return true;

      return new Promise((resolve: any, reject: any) => {
        let alert = this.alertCtrl.create({
          title: 'Save the timer Changes?',
          message: 'Timer has been changed, do you want to save your changes.'
        });
        alert.addButton({ text: 'Yes', handler: data => { this.dataService.setTimer(this.index, this.timer);; resolve(); } });
        alert.addButton({ text: 'No', handler: data => { resolve(); } });
        alert.addButton({ text: 'Cancel', role: 'cancel', handler: data => { reject(); } });
        alert.present();
      });
    }

}
