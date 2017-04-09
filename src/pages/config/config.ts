import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Data } from '../../providers/data';
import { TimerConfigPage } from '../timer-config/timer-config';
/*
  Generated class for the Config page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {

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
    alert.addButton({ text: 'Save', handler: data => { this.dataService.addTimer(data.timer); } });
    alert.present();    
  }

  editConfig(index) {
    console.log("editConfig : "+ index.toString())
    this.navCtrl.push(TimerConfigPage, { index: index });
  }

  onSlideChange	(s) {
    console.log("onSlideChange: "+s);
  }
  ionSlideDidChange	(x) {
    console.log("ionSlideDidChange: "+ JSON.stringify(x));
  }

  ionSlideDrag(x) {
    console.log("ionSlideDrag: "+ JSON.stringify(x));
  }

  ionSlidePrevEnd(x) {
    console.log("ionSlidePrevEnd: "+ JSON.stringify(x));
  }

  ionSlideNextStart(x) {
    console.log("ionSlideNextStart: "+ JSON.stringify(x));
  }

  ionSlideNextEnd(x) {
    console.log("ionSlideNextEnd: "+ JSON.stringify(x));
  }

}
