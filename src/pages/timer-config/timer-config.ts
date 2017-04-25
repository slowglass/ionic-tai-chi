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
          let l: number = this.navCtrl.length();
          this.navCtrl.remove(l-2);
          this.navCtrl.pop();
        } });
        alert.addButton({ text: 'No', handler: data => { }});
        alert.present();
    }
    ionViewDidLoad() {
      this.index = Number(this.navParams.get('timer'));
      this.timer = this.dataService.getTimer(this.index);
      console.log("ionViewDidLoad Index: "+ this.index.toString());
      TimerConfig.show("ionViewDidLoad", this.timer);
    }
}
