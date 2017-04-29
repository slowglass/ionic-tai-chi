import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TimerConfig } from '../../providers/timers/config';
import { SoundPlayer } from '../../providers/sound-player'
import { TimerConfigPage } from '../timer-config/timer-config'
import { Timers } from '../../providers/timers/timers';
import { YinYangTimer, TimerIteration } from "../../components/yin-yang/yin-yang"
import { Utils } from "../../libs/utils"

@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html'
})

export class TimerPage {
  private index: number;
  private config: TimerConfig;

  // 
  private topLabel = "Unset";
  private bottomLabel = "Unset";
  private colour = "#440088";
  private iterations:Array<TimerIteration> = [ ];

  @ViewChild(YinYangTimer) yyTimer;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    //public spinner: YinYangComponent,
    public soundPlayer: SoundPlayer,
    public timers: Timers)
    {
      this.config = new TimerConfig();

      //  Add Sounds to Sound Player
      this.soundPlayer.addSound("onMinuteEnd", "assets/sound/ting.wav");
      this.soundPlayer.addSound("onIterationEnd", "assets/sound/templeBell.wav");
      this.soundPlayer.addSound("onTimerEnd", "assets/sound/templeBell.wav");
    }

     
  ionViewWillEnter() {
    this.index = this.navParams.get('timer');
    this.config = this.timers.get(this.index);
    this.colour = this.config.colour;
    this.topLabel = this.config.iterations.toString();
    let dur = Utils.getDuration(this.config.period);
    this.bottomLabel = Utils.getTimeAsString(dur.minutes, dur.seconds);
    this.buildIterationsArray();
  }

  ionViewWillLeave() {
    this.yyTimer.stop();
  }

  buildIterationsArray() {
    var iters = [];
    var sdur = this.config.setup.seconds;
    var iter = this.config.iterations;
    var dur = Utils.getDuration(this.config.period);
    if (sdur>0)
      iters.push({label: "Setup", minutes: 0, seconds: sdur });
    for (let i=0;i<iter;i++)
    {
      iters.push({label: ""+(iter-i), minutes: dur.minutes, seconds: dur.seconds });
      if (this.config.setup.repeat)
        iters.push({label: "Setup", minutes: 0, seconds: sdur });
    }
    this.iterations = iters;
  }

  onMinuteEnd() { this.soundPlayer.play("onMinuteEnd"); }
  onChange($event) {
    switch ($event.change) {
      case "next": this.soundPlayer.play("onIterationEnd"); break;
      case "end": this.soundPlayer.play("onTimerEnd"); break;
    }
  }

  configTimer() {
    this.navCtrl.push(TimerConfigPage, { timer: this.index, new: false });
  }

}
