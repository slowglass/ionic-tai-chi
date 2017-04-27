import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TimerConfig } from '../../providers/timers/config';
import { SoundPlayer } from '../../providers/sound-player'
import { TimerConfigPage } from '../timer-config/timer-config'
import { Timers } from '../../providers/timers/timers';

@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html'
})

export class TimerPage {
  private index: number;
  private config: TimerConfig;
  private current;
  private timerCallbackId = null;
  private callbacks = { minRollover: null, iterRollover: null, finished: null };
  public display = { time: "", iteration: "", fg: "#000", bg: "#fff", paused: true };
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    //public spinner: YinYangComponent,
    public soundPlayer:SoundPlayer,
    public timers: Timers)
    {
      this.config = new TimerConfig();
      this.current = { state: "STATIONARY", min: 0, sec: 0, iter: -1 };

      //  Add Sounds to Sound Player
      this.soundPlayer.addSound("end", "assets/sound/templeBell.wav");
      this.soundPlayer.addSound("min", "assets/sound/ting.wav");
      this.soundPlayer.addSound("finished", "assets/sound/ting.wav");

      // Setup Sound play callbacks
      this.callbacks.minRollover = () => this.soundPlayer.play("min");
      this.callbacks.iterRollover = () => this.soundPlayer.play("end");
      this.callbacks.finished = () => this.soundPlayer.play("finished");
    }


    /**
     * Page Listeners
     */
     
  ionViewWillEnter() {
    this.index = this.navParams.get('timer');
    this.config = this.timers.get(this.index);
    var c = this.convertHex(this.config.getColour());
    this.display.fg = this.colToString(c);
    this.display.bg = this.colToString(this.yangColour(c));
    this.display.time = TimerConfig.getTimeAsString(this.config.getDuration());
    this.display.iteration = this.config.getIterations().toString();
  }


  configTimer() {
    this.navCtrl.push(TimerConfigPage, { timer: this.index, new: false });
  }

  colToString(c) {
    return "rgb(" + 
      c.r.toString() + "," + 
      c.g.toString() + "," + 
      c.b.toString() + ")";
  }

  convertHex(hex) {
    var r = parseInt(hex.substring(1,3), 16);
    var g = parseInt(hex.substring(3,5), 16);
    var b = parseInt(hex.substring(5,7), 16);
    return { r:r, b:b, g:g};
  }

  yangColour(c) {
    return { r:255-c.r, b:255-c.b, g:255-c.g};
  }



  ionViewWillLeave() {
    this.stop();
  }

  resetTimeEvent() {
    if (this.timerCallbackId!=null) clearInterval(this.timerCallbackId);
    this.timerCallbackId = null;
  }

  startTimeEvent() {
    var self = this;
    this.resetTimeEvent();
    this.timerCallbackId=setInterval(function() { self.tick(); }, 1000);
  }

  toggle() {
    if (this.current.state == "SPINNING")
      this.stop();
    else
      this.start();
  }
  
  start() {
    let t:TimerConfig=this.config;
    this.display.paused = false;
    console.log("MultiTimer", "Start");
    this.current = { state: "SPINNING", min: 0, sec: t.getSetupTime(), iter: t.getIterations() *2 };
    this.startTimeEvent();
    this.updateDisplay();
  }

  stop() {
    console.log("MultiTimer", "Stop");
    this.display.paused = true;
    this.resetTimeEvent();
    this.current = { state: "STATIONARY", min: 0, sec: 0, iter: -1 };
    this.updateDisplay();
  }

  tick() {
    let t=this.config;
    var callback=null;
    this.current.sec--;
    if (this.current.sec<0) { 
      this.current.sec= 59; 
      this.current.min--; 
      callback=this.callbacks.minRollover;
    }
    if (this.current.min<0) {
      this.current.iter--;
      callback=this.callbacks.iterRollover;
      if (this.current.iter%2 == 0) {
        if (t.setupRepeats()) { 
          this.current.sec=t.getSetupTime(); 
          this.current.min=0; 
        }
        else this.current.iter--;
      }
      if (this.current.iter%2 == 1) { 
        this.current.min=t.getDuration().minutes;
        this.current.sec= t.getDuration().seconds; 
      }
    }
    this.updateDisplay();
    if (callback != null) callback();
    if (this.current.iter<0)
    {
      this.stop();
      if (this.callbacks.finished != null) this.callbacks.finished();
    }
  }
  
  updateDisplay() { 
    let t=this.config;
    if (this.current.iter<0) { 
      var rep = t.setupRepeats() ? "+" : "";
      this.display.iteration = t.getIterations().toString();
      this.display.time = TimerConfig.getTimeAsString(t.getDuration()) + rep;
    } else {
      if (this.current.iter%2 == 0) this.display.iteration = "Setup"; 
      else this.display.iteration = ((this.current.iter+1)/2).toString();
      this.display.time = TimerConfig.getTimeAsString({ minutes: this.current.min, seconds: this.current.sec }); 
    }

    console.log("MultiTimer", "Update");
    console.log("MultiTimer", "   Iteration: "+this.display.iteration);
    console.log("MultiTimer", "   Time:      "+this.display.time);

  }
}
